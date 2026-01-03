import { NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'
import { requireAdminAuth } from '@/lib/admin-auth'

export async function GET(request: Request) {
  const auth = requireAdminAuth(request)
  if (!auth.ok) return NextResponse.json(auth.body, { status: auth.status })

  console.log('[DEBUG RL] Rate-limit debug hit')

  const result = await checkRateLimit('debug:rl:test', { windowMs: 5 * 60 * 1000, max: 5, prefix: 'rl' })

  console.log('[DEBUG RL] Result', result)

  return NextResponse.json({
    success: true,
    result,
  })
}
