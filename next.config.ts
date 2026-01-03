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
  const directives: Record<string, string[]> = {
    'default-src': ["'self'"],
    'script-src': ["'self'"],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", 'data:', 'https:'],
    'font-src': ["'self'", 'https:', 'data:'],
    'connect-src': ["'self'", 'https:'],
    'frame-src': ["'self'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
  }

  if (isDev) {
    // Allow eval and inline scripts/styles for dev tooling (HMR/Turbopack)
    directives['script-src'].push("'unsafe-eval'", "'unsafe-inline'")
    directives['connect-src'].push('ws:', 'wss:')
  }

  return Object.entries(directives)
    .map(([k, v]) => `${k} ${v.join(' ')}`)
    .join('; ')
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
