import { kv } from "@/lib/kv";

const SITE_REGISTRY_PREFIX = "buildwithai:sites";
const SITE_REGISTRY_INDEX = "buildwithai:sites:index";

export type SiteRegistryEntry = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
};

export async function registerSite(id: string, name: string) {
  const key = `${SITE_REGISTRY_PREFIX}:${id}`;
  const existing = await kv.get(key);

  if (existing) return existing;

  const entry: SiteRegistryEntry = {
    id,
    name,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  await kv.set(key, entry);
  // Add to index of sites
  try {
    const idx = (await kv.get(SITE_REGISTRY_INDEX)) as string[] | null;
    const nextIdx = Array.isArray(idx) ? Array.from(new Set([...idx, id])) : [id];
    await kv.set(SITE_REGISTRY_INDEX, nextIdx);
  } catch (e) {
    // ignore index update failures
  }
  return entry;
}

export async function updateSiteTimestamp(id: string) {
  const key = `${SITE_REGISTRY_PREFIX}:${id}`;
  const entry = (await kv.get(key)) as SiteRegistryEntry | null;

  if (!entry) return;

  entry.updatedAt = Date.now();
  await kv.set(key, entry);
}

export async function listSites(): Promise<SiteRegistryEntry[]> {
  const idx = (await kv.get(SITE_REGISTRY_INDEX)) as string[] | null;
  const entries: SiteRegistryEntry[] = [];

  if (!Array.isArray(idx) || idx.length === 0) return entries;

  for (const id of idx) {
    const key = `${SITE_REGISTRY_PREFIX}:${id}`;
    const entry = await kv.get(key);
    if (entry) entries.push(entry as SiteRegistryEntry);
  }

  return entries.sort((a, b) => b.updatedAt - a.updatedAt);
}
