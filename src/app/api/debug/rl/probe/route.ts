import { NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'
import { requireAdminAuth } from '@/lib/admin-auth'

export async function GET(request: Request) {
  const auth = requireAdminAuth(request)
  if (!auth.ok) return NextResponse.json(auth.body, { status: auth.status })

  console.log('[DEBUG RL PROBE] Probe hit')

  const clientIp = (request.headers.get('x-forwarded-for') || '').split(',')[0] || request.headers.get('x-real-ip') || 'unknown'
  const key = `domain:info:${clientIp}`
  const rl = await checkRateLimit(key, { windowMs: 5 * 60 * 1000, max: 5, prefix: 'rl' })

  console.log('[DEBUG RL PROBE] Result', { key, ...rl })

  return NextResponse.json({ success: true, clientIp, rl })
}
