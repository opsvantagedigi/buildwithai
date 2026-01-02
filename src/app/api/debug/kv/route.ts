import { NextResponse } from 'next/server'
import { kv } from '@/lib/kv'

// Temporary debug endpoint to verify KV write persistence.
// This route increments a counter and returns the previous + new value.
// If KV writes are not persisting, "previous" will always be 0.

export async function GET() {
  const testKey = 'debug:rl:test'

  try {
    const prevRaw = await kv.get(testKey)
    let previous = 0
    if (prevRaw == null) {
      previous = 0
    } else if (typeof prevRaw === 'number') {
      previous = prevRaw
    } else if (typeof prevRaw === 'string') {
      try {
        const parsed = JSON.parse(prevRaw)
        previous = Number(parsed)
      } catch (_) {
        previous = Number(prevRaw)
      }
    }
    if (!Number.isFinite(previous)) previous = 0

    await kv.set(testKey, previous + 1, {
      ex: 60, // expire after 60 seconds
    })

    return NextResponse.json({
      success: true,
      previous,
      now: previous + 1,
    })
  } catch (error) {
    console.error('[DEBUG KV] Error interacting with KV', { error })

    return NextResponse.json(
      {
        success: false,
        error: 'KV operation failed',
      },
      { status: 500 }
    )
  }
}
