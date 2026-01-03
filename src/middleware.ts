import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const csp = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' blob:;
    style-src 'self' 'unsafe-inline' blob: data:;
    style-src-elem 'self' 'unsafe-inline';
    img-src 'self' data: blob: https:;
    font-src 'self' data: https://fonts.gstatic.com;
    connect-src 'self' https:;
    media-src 'self';
    object-src 'none';
    frame-src 'self';
    base-uri 'self';
    form-action 'self';
    manifest-src 'self';
    worker-src 'self' blob:;
  `.replace(/\s{2,}/g, ' ').trim()

  res.headers.set('Content-Security-Policy', csp)
  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
