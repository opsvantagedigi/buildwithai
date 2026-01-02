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

const nextConfig: NextConfig = withMDX({
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  // Allow eval in development for HMR/dev tooling (Turbopack etc.)
  images: {
    // loosen CSP only in development so dev HMR that uses eval works in the browser
    contentSecurityPolicy:
      process.env.NODE_ENV === 'development'
        ? "script-src 'self' 'unsafe-eval' 'unsafe-inline'; frame-src 'none'; sandbox;"
        : "script-src 'self'; frame-src 'none'; sandbox;",
  },
});

export default nextConfig;
