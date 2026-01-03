import { NextResponse } from 'next/server'
import { requireAdminAuth } from '@/lib/admin-auth'

export async function GET(request: Request) {
  const auth = requireAdminAuth(request)
  if (!auth.ok) return NextResponse.json(auth.body, { status: auth.status })
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) {
    return NextResponse.json(
      {
        success: false,
        error: 'Missing KV_REST_API_URL or KV_REST_API_TOKEN in environment',
        urlPresent: Boolean(url),
        tokenPresent: Boolean(token),
      },
      { status: 500 }
    )
  }

  console.log('[DEBUG KV RAW] Querying Upstash', { hasUrl: Boolean(url), hasToken: Boolean(token) })

  const key = 'debug:rl:test'

  try {
    const resp = await fetch(`${url.replace(/\/$/, '')}/get/${encodeURIComponent(key)}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    })

    const data = await resp.json().catch(() => null)

    console.log('[DEBUG KV RAW] Response', { key, httpStatus: resp.status, hasResult: data && 'result' in data })

    return NextResponse.json({ success: true, key, httpStatus: resp.status, upstashResponse: data })
  } catch (err) {
    console.error('[DEBUG KV RAW] Failed to query Upstash', { key, error: err })
    return NextResponse.json({ success: false, error: 'Failed to query Upstash REST API', details: String((err as any)?.message || err) }, { status: 500 })
  }
}
