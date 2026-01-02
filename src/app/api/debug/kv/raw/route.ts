import { NextResponse } from 'next/server'

export async function GET() {
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

  const key = 'debug:rl:test'

  try {
    // Use the raw Upstash REST API to fetch the key directly and return the full response
    const resp = await fetch(`${url.replace(/\/$/, '')}/get/${encodeURIComponent(key)}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    })

    const upstashJson = await resp.json().catch(() => null)

    return NextResponse.json({
      success: true,
      key,
      httpStatus: resp.status,
      upstashResponse: upstashJson,
    })
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to query Upstash REST API',
        details: String((err as any)?.message || err),
      },
      { status: 500 }
    )
  }
}
