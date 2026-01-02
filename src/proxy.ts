import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// New Next.js 15+ proxy signature
export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  // Only protect /admin routes
  if (!pathname.startsWith('/admin')) return NextResponse.next()

  const token = searchParams.get('token') || request.headers.get('x-admin-token')
  const expected = process.env.ADMIN_DASHBOARD_TOKEN

  if (!expected) {
    return new NextResponse('ADMIN_DASHBOARD_TOKEN is not configured on the server.', { status: 500 })
  }

  if (!token || token !== expected) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
