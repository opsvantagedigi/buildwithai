// Simple KV-backed rate limiter using Upstash REST if available.
// If no REST KV is configured, rate limiting is a no-op (allowed).

export type RateLimitResult = {
  allowed: boolean
  remaining: number
  resetAt: number
}

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL?.replace(/\/$/, '')
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN

export type RateLimitOptions = {
  windowMs: number
  max: number
  prefix?: string
}

export async function checkRateLimit(key: string, options: RateLimitOptions): Promise<RateLimitResult> {
  const { windowMs, max, prefix = 'rl' } = options
  const now = Date.now()
  const windowStart = Math.floor(now / windowMs) * windowMs
  const bucketKey = `${prefix}:${key}:${windowStart}`

  if (!UPSTASH_URL || !UPSTASH_TOKEN) {
    // No KV available — allow but log for visibility
    console.warn('[rate-limit] No Upstash KV configured; skipping rate limit for', key)
    return { allowed: true, remaining: max, resetAt: windowStart + windowMs }
  }

  try {
    // GET current
    const getRes = await fetch(`${UPSTASH_URL}/get/${encodeURIComponent(bucketKey)}`, {
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
    })
    let current = 0
    if (getRes.ok) {
      const j = await getRes.json()
      current = Number(j.result ?? 0)
    }

    if (current >= max) {
      return { allowed: false, remaining: 0, resetAt: windowStart + windowMs }
    }

    // Increment (set new value)
    const newValue = current + 1
    await fetch(`${UPSTASH_URL}/set/${encodeURIComponent(bucketKey)}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${UPSTASH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value: String(newValue) }),
    })

    // ensure TTL covers window
    const ttlSec = Math.ceil(windowMs / 1000)
    await fetch(`${UPSTASH_URL}/expire/${encodeURIComponent(bucketKey)}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${UPSTASH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ttl: ttlSec }),
    })

    return { allowed: true, remaining: Math.max(0, max - newValue), resetAt: windowStart + windowMs }
  } catch (err) {
    console.error('[rate-limit] error', err)
    return { allowed: true, remaining: max, resetAt: windowStart + windowMs }
  }
}
