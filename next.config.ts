import type { NextConfig } from "next";

let withMDX = (cfg: any) => cfg;
try {
  // Dynamically require @next/mdx so builds don't fail when it's not installed
  // (useful during development or CI where MDX support may be toggled).
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const createMDX = require('@next/mdx');
  withMDX = createMDX({ extension: /.mdx?$/ });
} catch (err) {
  // continue without MDX support
  // eslint-disable-next-line no-console
  console.warn('Optional dependency @next/mdx not found — continuing without MDX support.');
}

const isDev = process.env.NODE_ENV !== 'production'

// Build a safe, modern CSP. Dev is looser to preserve HMR and Turbopack UX.
function buildCsp(): string {
  // Canonical CSP for Next.js 14 + Vercel (production-safe)
  // Allows next/font, Next.js hydration styles, emitted CSS chunks, and Vercel assets.
  const directives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' blob: https://vercel.live",
    "style-src 'self' 'unsafe-inline' blob: data:",
    "style-src-elem 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
  ]

  // Loosen a bit in dev for HMR tooling
  if (isDev) {
    directives.push("connect-src ws: wss:")
  }

  return directives.join('; ')
}

const securityHeaders = [
  { key: 'Content-Security-Policy', value: buildCsp() },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-XSS-Protection', value: '0' },
]

const nextConfig: NextConfig = withMDX({
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],

  // Keep your existing images CSP override for dev only
  images: {
    contentSecurityPolicy: isDev
      ? "script-src 'self' 'unsafe-eval' 'unsafe-inline'; frame-src 'none'; sandbox;"
      : "script-src 'self'; frame-src 'none'; sandbox;",
  },

  // Apply security headers site-wide. If you already have headers(), merge instead.
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
})

export default nextConfig;
