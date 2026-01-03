import { registerTemplate } from "./registry";

export async function initTemplates() {
  await registerTemplate({
    id: "landing",
    name: "Landing Page",
    category: "Business",
    thumbnail: "/templates/landing.png",
    tags: ["business", "startup", "hero"],
    createdAt: Date.now(),
    updatedAt: Date.now()
  });

  await registerTemplate({
    id: "portfolio",
    name: "Portfolio",
    category: "Creative",
    thumbnail: "/templates/portfolio.png",
    tags: ["portfolio", "gallery", "creative"],
    createdAt: Date.now(),
    updatedAt: Date.now()
  });
}
