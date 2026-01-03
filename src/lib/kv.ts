// Thin Vercel KV adapter. If @vercel/kv is not installed or KV is not configured,
// these functions fail gracefully and return null / noop. A conservative
// no-write fallback is implemented so we can avoid attempting writes when the
// deployment only provides a read-only token.
let kvClient: any = null
// Detect explicit write availability vs read-only-only mode.
const WRITE_ENABLED = !!(process.env.KV_REST_API_WRITE_TOKEN || process.env.KV_REST_API_TOKEN)
const READ_ONLY_ONLY = !!process.env.KV_REST_API_READ_ONLY_TOKEN && !WRITE_ENABLED
const NO_WRITE_FALLBACK = process.env.NO_WRITE_FALLBACK === 'true' || READ_ONLY_ONLY

try {
  // If the project already has UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
  // or custom WRITE/READ env names set, map them to the names expected by
  // `@vercel/kv` at runtime so the package can pick them up without changing
  // Vercel project env names. Do NOT log values or expose secrets.
  if (!process.env.KV_REST_API_URL) {
    process.env.KV_REST_API_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL
  }
  if (!process.env.KV_REST_API_TOKEN) {
    process.env.KV_REST_API_TOKEN = process.env.KV_REST_API_WRITE_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_READ_ONLY_TOKEN || process.env.KV_REST_API_TOKEN
  }

  // Construct the module name so static analyzers can't find the literal
  const moduleName = '@' + 'vercel' + '/kv'
  // Use eval to call require at runtime; this avoids bundlers resolving the import
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  // @ts-ignore
  const kv = eval('require')(moduleName)
  kvClient = kv.kv || kv
} catch (e) {
  // package not installed or not available in this environment; try an
  // Upstash REST fallback if UPSTASH_REDIS_REST_URL/TOKEN are available.
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN
  if (upstashUrl && upstashToken) {
    const base = upstashUrl.replace(/\/$/, '')
    kvClient = {
      async get(key: string) {
        try {
          const res = await fetch(`${base}/get/${encodeURIComponent(key)}`, {
            headers: { Authorization: `Bearer ${upstashToken}` },
          })
          if (!res.ok) return null
          const j = await res.json()
          return j.result ?? null
        } catch (_) {
          return null
        }
      },
      async set(key: string, value: any) {
        if (NO_WRITE_FALLBACK) return { skippedReadOnly: true }
        try {
          // Upstash expects simple JSON with `value` field for the set endpoint
          await fetch(`${base}/set/${encodeURIComponent(key)}`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${upstashToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ value: typeof value === 'string' ? value : JSON.stringify(value) }),
          })
          return true
        } catch (_) {
          return null
        }
      },
      async expire(key: string, ttl: number) {
        if (NO_WRITE_FALLBACK) return null
        try {
          await fetch(`${base}/expire/${encodeURIComponent(key)}`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${upstashToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ttl }),
          })
          return true
        } catch (_) {
          return null
        }
      },
    }
  } else {
    kvClient = null
  }
}

const RDAP_TTL_SECONDS = 300

export async function kvGetRdap(domain: string) {
  if (!kvClient) return null
  try {
    const key = `rdap:${domain.toLowerCase()}`
    const value = await kvClient.get(key)
    return value ?? null
  } catch (e) {
    return null
  }
}

export async function kvSetRdap(domain: string, value: any) {
  if (!kvClient) return null
  if (NO_WRITE_FALLBACK) return { skippedReadOnly: true }
  try {
    const key = `rdap:${domain.toLowerCase()}`
    // @vercel/kv supports expire via .set with options in newer versions; use simple set
    const setResult = await kvClient.set(key, value)
    // If the client supports expiration, set TTL separately (best-effort)
    try {
      if (typeof kvClient.expire === 'function') await kvClient.expire(key, RDAP_TTL_SECONDS)
    } catch (_) {
      // ignore
    }
    return setResult
  } catch (e) {
    // fail silently
    return null
  }
}

// Lightweight generic KV helper (non-breaking addition).
// Provides `kv.get(key)` and `kv.set(key, value, { ex })` to support debug routes.
export const kv = {
  async get(key: string) {
    if (!kvClient) return null
    try {
      const v = await kvClient.get(key)
      // Normalize multiple possible shapes returned by different clients
      //  - raw primitive (number/string)
      //  - JSON string ("{...}")
      //  - wrapped object like { value: "..." }
      if (v === null || v === undefined) return null

      let parsed: any = v
      if (typeof v === 'string') {
        try {
          parsed = JSON.parse(v)
        } catch (_) {
          parsed = v
        }
      }

      // If the stored value is wrapped as { value: "..." }, unwrap it.
      if (parsed && typeof parsed === 'object' && 'value' in parsed) {
        const inner = parsed.value
        if (typeof inner === 'string') {
          try {
            return JSON.parse(inner)
          } catch (_) {
            return inner
          }
        }
        return inner
      }

      return parsed
    } catch (_) {
      return null
    }
  },
  async set(key: string, value: any, opts?: { ex?: number }) {
    if (!kvClient) return null
    if (NO_WRITE_FALLBACK) return { skippedReadOnly: true }
    try {
      // Avoid double-encoding: pass raw values to the underlying client and
      // let that client (or our Upstash REST wrapper) handle any required
      // encoding. This prevents nested JSON like "{\"value\":\"1\"}".
      const setResult = await kvClient.set(key, value)
      if (opts?.ex && typeof kvClient.expire === 'function') {
        try {
          await kvClient.expire(key, Math.ceil(opts.ex))
        } catch (_) {
          // ignore
        }
      }
      return setResult
    } catch (_) {
      return null
    }
  },
}

export default { kvGetRdap, kvSetRdap }

export function getKvStatus() {
  return {
    writeEnabled: WRITE_ENABLED,
    readOnlyOnly: READ_ONLY_ONLY,
    noWriteFallback: NO_WRITE_FALLBACK,
    kvClientPresent: !!kvClient,
    kvUrl: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || null,
  }
}
