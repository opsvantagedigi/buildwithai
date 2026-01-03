import type { BuilderState, BuilderBlock } from "@/types/builder";

export type ExportedSite = {
  html: string;
  css: string;
  head: string;
};

function renderBlock(block: BuilderBlock): string {
  const data = block.data ?? {};

  switch (block.type) {
    case "hero": {
      const heading = data.heading ?? "Welcome to your new site";
      const subheading =
        data.subheading ??
        "This page was generated with Build With AI.";
      const ctaLabel = data.ctaLabel ?? "Get started";
      return `
<section class="hero">
  <div class="container">
    <h1>${heading}</h1>
    <p>${subheading}</p>
    <a href="#contact" class="btn-primary">${ctaLabel}</a>
  </div>
</section>`;
    }

    case "features": {
      const title = data.title ?? "Features";
      const items: Array<{ title: string; description: string }> =
        data.items ?? [];
      const list = items
        .map(
          (item) => `
  <div class="feature">
    <h3>${item.title}</h3>
    <p>${item.description}</p>
  </div>`
        )
        .join("\n");
      return `
<section class="features">
  <div class="container">
    <h2>${title}</h2>
    <div class="feature-grid">
      ${list}
    </div>
  </div>
</section>`;
    }

    case "testimonials": {
      const title = data.title ?? "What people are saying";
      const items: Array<{ quote: string; name: string }> =
        data.items ?? [];
      const list = items
        .map(
          (item) => `
  <div class="testimonial">
    <blockquote>“${item.quote}”</blockquote>
    <p class="name">${item.name}</p>
  </div>`
        )
        .join("\n");
      return `
<section class="testimonials">
  <div class="container">
    <h2>${title}</h2>
    <div class="testimonial-grid">
      ${list}
    </div>
  </div>
</section>`;
    }

    case "faq": {
      const title = data.title ?? "Frequently asked questions";
      const items: Array<{ question: string; answer: string }> =
        data.items ?? [];
      const list = items
        .map(
          (item) => `
  <div class="faq-item">
    <h3>${item.question}</h3>
    <p>${item.answer}</p>
  </div>`
        )
        .join("\n");
      return `
<section class="faq">
  <div class="container">
    <h2>${title}</h2>
    <div class="faq-list">
      ${list}
    </div>
  </div>
</section>`;
    }

    case "cta": {
      const heading = data.heading ?? "Ready to begin?";
      const subheading =
        data.subheading ?? "Take the next step with your new site.";
      const ctaLabel = data.ctaLabel ?? "Contact us";
      return `
<section class="cta">
  <div class="container">
    <h2>${heading}</h2>
    <p>${subheading}</p>
    <a href="#contact" class="btn-primary">${ctaLabel}</a>
  </div>
</section>`;
    }

    default: {
      return `
<section class="unknown">
  <div class="container">
    <p>Unsupported block type: ${block.type}</p>
  </div>
</section>`;
    }
  }
}

export function exportSiteToStatic(state: BuilderState): ExportedSite {
  const title = state.metadata.name || "Build With AI site";
  const description =
    state.metadata.description ||
    "A site generated with Build With AI.";

  const blocksHtml = (state.pages[0]?.blocks ?? [])
    .map((block) => renderBlock(block))
    .join("\n\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  {{HEAD}}
</head>
<body>
  <main>
    ${blocksHtml}
  </main>
</body>
</html>`;

  const css = `
:root {
  --bg: #0f172a;
  --fg: #ffffff;
  --accent: #22c55e;
  --muted: #94a3b8;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text",
    "Inter", sans-serif;
  background: var(--bg);
  color: var(--fg);
}

main {
  padding: 40px 0 80px;
}

.container {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero {
  padding: 80px 0 60px;
}

.hero h1 {
  font-size: 2.75rem;
  line-height: 1.1;
  margin-bottom: 16px;
}

.hero p {
  font-size: 1.1rem;
  color: var(--muted);
  max-width: 600px;
}

.btn-primary {
  display: inline-block;
  margin-top: 24px;
  padding: 10px 18px;
  border-radius: 999px;
  background: var(--accent);
  color: #020617;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
}

.features,
.testimonials,
.faq,
.cta {
  padding: 40px 0;
}

.features h2,
.testimonials h2,
.faq h2,
.cta h2 {
  font-size: 1.6rem;
  margin-bottom: 16px;
}

.feature-grid,
.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.feature,
.testimonial,
.faq-item {
  padding: 14px 16px;
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.3);
}

.feature h3,
.faq-item h3 {
  margin: 0 0 8px;
  font-size: 1rem;
}

.feature p,
.faq-item p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--muted);
}

.testimonial blockquote {
  margin: 0 0 8px;
  font-size: 0.95rem;
}

.testimonial .name {
  margin: 0;
  font-size: 0.85rem;
  color: var(--muted);
}

.cta p {
  margin-top: 8px;
  color: var(--muted);
}

.unknown {
  padding: 20px 0;
}

.unknown p {
  font-size: 0.85rem;
  color: var(--muted);
}
`;

  const head = `
<link rel="stylesheet" href="/styles.css" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
`;

  return {
    html: html.replace("{{HEAD}}", head),
    css,
    head,
  };
}
