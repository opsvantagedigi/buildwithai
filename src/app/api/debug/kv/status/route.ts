import { NextResponse } from 'next/server'
import { kv, getKvStatus } from '@/lib/kv'
import { requireAdminAuth } from '@/lib/admin-auth'

// Non-destructive status endpoint for KV write capability.
// Returns configuration flags and attempts a non-destructive write-read
// if writes appear enabled. Does not expose secrets.

export async function GET(request: Request) {
  const auth = requireAdminAuth(request)
  if (!auth.ok) return NextResponse.json(auth.body, { status: auth.status })

  const status = getKvStatus()

  // Basic response with flags
  const resBody: any = {
    success: true,
    writeEnabled: status.writeEnabled,
    readOnlyOnly: status.readOnlyOnly,
    noWriteFallback: status.noWriteFallback,
    kvClientPresent: status.kvClientPresent,
    kvUrl: status.kvUrl ? 'present' : null,
  }

  // If writes are enabled, attempt a best-effort test write and read.
  if (status.writeEnabled && status.kvClientPresent) {
    try {
      const testKey = 'debug:status:probe'
      const before = await kv.get(testKey)
      // write a marker with short TTL
      await kv.set(testKey, Date.now(), { ex: 30 })
      const after = await kv.get(testKey)
      resBody.testWrite = {
        before: before ?? null,
        after: after ?? null,
        persisted: after != null,
      }
    } catch (e) {
      resBody.testWrite = { error: String((e as any)?.message || e) }
    }
  } else {
    resBody.testWrite = null
  }
  console.log('[DEBUG KV STATUS] Probe', { kvClientPresent: status.kvClientPresent })

  return NextResponse.json(resBody)
}
