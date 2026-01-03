// Thin Vercel KV adapter. If @vercel/kv is not installed or KV is not configured,
// these functions fail gracefully and return null / noop. A conservative
// no-write fallback is implemented so we can avoid attempting writes when the
// deployment only provides a read-only token.
let kvClient: any = null
// Flags will be computed after env mapping so they reflect mapped UPSTASH vars
let WRITE_ENABLED = false
let READ_ONLY_ONLY = false
let NO_WRITE_FALLBACK = false

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

  // Compute write/read flags after any env mapping above so they reflect
  // the effective environment variables (e.g. UPSTASH -> KV mapping).
  WRITE_ENABLED = !!(process.env.KV_REST_API_WRITE_TOKEN || process.env.KV_REST_API_TOKEN)
  READ_ONLY_ONLY = !!process.env.KV_REST_API_READ_ONLY_TOKEN && !WRITE_ENABLED
  NO_WRITE_FALLBACK = process.env.NO_WRITE_FALLBACK === 'true' || READ_ONLY_ONLY

  // If explicit Upstash REST envs are present prefer a thin REST wrapper so
  // local scripts and child processes use the same predictable code-path.
  const earlyUpstashUrl = process.env.UPSTASH_REDIS_REST_URL
  const earlyUpstashToken = process.env.UPSTASH_REDIS_REST_TOKEN
  if (earlyUpstashUrl && earlyUpstashToken) {
    const base = earlyUpstashUrl.replace(/\/$/, '')
    kvClient = {
      async get(key: string) {
        try {
          const res = await fetch(`${base}/get/${encodeURIComponent(key)}`, {
            headers: { Authorization: `Bearer ${earlyUpstashToken}` },
          })
          if (!res.ok) return null
          const j = await res.json()
          return j.result ?? null
        } catch (err) {
          console.error("[KV] early REST get() failed:", err)
          return null
        }
      },
      async set(key: string, value: any) {
        if (NO_WRITE_FALLBACK) return { skippedReadOnly: true }
        try {
          await fetch(`${base}/set/${encodeURIComponent(key)}`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${earlyUpstashToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ value: typeof value === 'string' ? value : JSON.stringify(value) }),
          })
          return true
        } catch (err) {
          console.error("[KV] early REST set() failed:", err)
          return null
        }
      },
      async expire(key: string, ttl: number) {
        if (NO_WRITE_FALLBACK) return null
        try {
          await fetch(`${base}/expire/${encodeURIComponent(key)}`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${earlyUpstashToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ttl }),
          })
          return true
        } catch (err) {
          console.error("[KV] early REST expire() failed:", err)
          return null
        }
      },
    }
  }

  // Construct the module name so static analyzers can't find the literal
  const moduleName = '@' + 'vercel' + '/kv'
  // Use eval to call require at runtime; this avoids bundlers resolving the import
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  // @ts-ignore
  const kvModule = eval('require')(moduleName)

  // Pick a candidate client from common export shapes
  let candidate: any = kvModule?.kv ?? kvModule?.default ?? kvModule

  // If the module exports a factory function, attempt to call it with env
  if (typeof candidate === 'function') {
    // Wrap factory in a lazy initializer so child processes or scripts that
    // load env files after module import still work. The lazy wrapper will
    // call the factory on first use with the current env values.
    const factory = candidate
    const makeLazy = (factoryFn: any) => {
      let realClient: any = null
      let initAttempted = false
      const ensure = async () => {
        if (realClient) return realClient
        if (initAttempted) return realClient
        initAttempted = true
        try {
          const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
          const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
          realClient = await factoryFn({ url, token })
          if (!(realClient && typeof realClient.get === 'function' && typeof realClient.set === 'function')) {
            realClient = null
          }
        } catch (err) {
          realClient = null
        }
        return realClient
      }
      return {
        async get(k: string) {
          const c = await ensure()
          if (!c) throw new Error('kv_not_initialized')
          return c.get(k)
        },
        async set(k: string, v: any) {
          const c = await ensure()
          if (!c) throw new Error('kv_not_initialized')
          return c.set(k, v)
        },
        async expire(k: string, t: number) {
          const c = await ensure()
          if (!c) throw new Error('kv_not_initialized')
          if (typeof c.expire === 'function') return c.expire(k, t)
          return null
        },
      }
    }

    try {
      candidate = makeLazy(factory)
    } catch (err) {
      // ignore and validate below
    }
  }

  // Validate that candidate exposes get/set
  if (candidate && typeof candidate.get === 'function' && typeof candidate.set === 'function') {
    kvClient = candidate
  } else {
    // Diagnostic + force fallback to Upstash REST in the catch block below
    console.warn('[KV] Falling back to Upstash REST wrapper: invalid client shape', Object.keys(kvModule || {}))
    throw new Error('invalid_kv_client_shape')
  }
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
        } catch (err) {
          console.error("[KV] get() failed:", err)
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
        } catch (err) {
          console.error("[KV] set() failed:", err)
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
        } catch (err) {
          console.error("[KV] expire() failed:", err)
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
    } catch (err) {
      console.error("[KV] get() failed:", err)
      // If the underlying client failed due to an invalid/missing base URL,
      // attempt a best-effort direct Upstash REST fallback using environment
      // variables. This helps in child-process/test runtimes where the
      // installed client was initialized with undefined env values.
      try {
        if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
          const base = (process.env.UPSTASH_REDIS_REST_URL || '').replace(/\/$/, '')
          const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN
          const url = `${base}/get/${encodeURIComponent(key)}`
          console.log('[KV] attempting Upstash REST fallback GET', url)
          const res = await fetch(url, {
            headers: { Authorization: `Bearer ${upstashToken}` },
          })
          console.log('[KV] upstash REST fallback status', res.status)
          if (!res.ok) return null
          const j = await res.json()
          console.log('[KV] upstash REST fallback body keys', Object.keys(j || {}))
          return j.result ?? null
        }
      } catch (fallbackErr) {
        console.error('[KV] upstash REST fallback failed:', fallbackErr)
      }
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
    } catch (err) {
      console.error("[KV] set() failed:", err)
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

// Temporary debug helper — writes and reads a test key and logs results.
export async function debugKvRoundTrip() {
  const key = "debug:kv:test"
  const value = { ok: true, ts: Date.now() }
  console.log("[KV] Writing test key:", key)
  const writeResult = await kv.set(key, JSON.stringify(value))
  console.log("[KV] Write result:", writeResult)
  const readResult = await kv.get(key)
  console.log("[KV] Read result:", readResult)
  return { writeResult, readResult }
}
