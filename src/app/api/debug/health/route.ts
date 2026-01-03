import { NextResponse } from 'next/server'
import { kv } from '@/lib/kv'
import { checkRateLimit } from '@/lib/rate-limit'
import { requireAdminAuth } from '@/lib/admin-auth'

export async function GET(request: Request) {
  const auth = requireAdminAuth(request)
  if (!auth.ok) return NextResponse.json(auth.body, { status: auth.status })

  const startedAt = Date.now()

  const kvKey = 'debug:health:kv'

  console.log('[DEBUG HEALTH] Starting composite health check')

  const results: any = {
    kv: null,
    rateLimit: null,
    meta: {
      startedAt,
    },
  }

  try {
    // KV probe
    const previous = (await kv.get(kvKey)) ?? 0
    await kv.set(kvKey, previous + 1, { ex: 60 })

    results.kv = {
      ok: true,
      key: kvKey,
      previous,
      now: previous + 1,
    }

    console.log('[DEBUG HEALTH] KV probe', results.kv)
  } catch (error) {
    console.error('[DEBUG HEALTH] KV probe failed', { error })
    results.kv = {
      ok: false,
      error: 'KV probe failed',
    }
  }

  try {
    // Rate-limit probe
    const rlKey = 'debug:health:rl'
    const rl = await checkRateLimit(rlKey, { windowMs: 5 * 60 * 1000, max: 5, prefix: 'rl' })

    results.rateLimit = {
      ok: true,
      key: rlKey,
      ...rl,
    }

    console.log('[DEBUG HEALTH] Rate-limit probe', results.rateLimit)
  } catch (error) {
    console.error('[DEBUG HEALTH] Rate-limit probe failed', { error })
    results.rateLimit = {
      ok: false,
      error: 'Rate-limit probe failed',
    }
  }

  results.meta.finishedAt = Date.now()
  results.meta.durationMs = results.meta.finishedAt - startedAt

  const overallOk = Boolean(results.kv?.ok && results.rateLimit?.ok)

  return NextResponse.json({
    success: overallOk,
    ...results,
  })
}
