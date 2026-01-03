import { kv } from "@/lib/kv";

const TEMPLATE_REGISTRY_KEY = "buildwithai:templates:registry";

export type TemplateEntry = {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
};

export async function listTemplates(): Promise<TemplateEntry[]> {
  return ((await kv.get(TEMPLATE_REGISTRY_KEY)) as TemplateEntry[]) ?? [];
}

export async function registerTemplate(entry: TemplateEntry) {
  const existing = await listTemplates();
  const updated = [...existing.filter((t) => t.id !== entry.id), entry];
  await kv.set(TEMPLATE_REGISTRY_KEY, updated);
}

export async function getTemplate(id: string): Promise<TemplateEntry | null> {
  const all = await listTemplates();
  return all.find((t) => t.id === id) ?? null;
}
