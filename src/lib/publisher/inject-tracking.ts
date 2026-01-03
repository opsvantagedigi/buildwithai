// src/lib/publisher/inject-tracking.ts

/**
 * Injects analytics tracking into final published HTML.
 *
 * Adds:
 *   <script>window.__SITE_ID__ = "..."</script>
 *   <script src="/track.js"></script>
 *
 * Injected before </head> if possible, otherwise at the top of <body>.
 */
export function injectTracking(html: string, siteId: string): string {
  const siteIdScript = `<script>window.__SITE_ID__ = "${siteId}"</script>`;
  const trackerScript = `<script src="/track.js"></script>`;

  const injection = `${siteIdScript}\n${trackerScript}`;

  // Prefer injecting before </head>
  if (html.includes("</head>")) {
    return html.replace("</head>", `${injection}\n</head>`);
  }

  // Fallback: inject at top of <body>
  if (html.includes("<body")) {
    return html.replace(/<body(.*?)>/i, (m) => `${m}\n${injection}`);
  }

  // Last resort: prepend
  return `${injection}\n${html}`;
}
