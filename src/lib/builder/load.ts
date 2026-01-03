import { kv } from "@/lib/kv";
import type { BuilderState } from "@/types/builder";

const KEY_PREFIX = "buildwithai:site:";

export async function loadSiteState(
  siteId: string
): Promise<BuilderState | null> {
  const key = `${KEY_PREFIX}${siteId}`;
  const raw = await kv.get(key);
  if (!raw) return null;

  // `kv.get` may return a parsed object or a JSON string depending on the
  // underlying client. Normalize to an object safely.
  let parsed: any = raw;
  if (typeof raw === "string") {
    try {
      parsed = JSON.parse(raw);
    } catch {
      // If parsing fails, treat as missing/invalid
      return null;
    }
  }

  // Validate minimal schema
  if (!parsed || typeof parsed !== "object") return null;
  if (!parsed.metadata || !parsed.pages) return null;

  // Ensure metadata fields exist
  parsed.metadata = {
    id: parsed.metadata.id ?? siteId,
    name: parsed.metadata.name ?? "",
    description: parsed.metadata.description ?? "",
    createdAt: parsed.metadata.createdAt ?? Date.now(),
    updatedAt: parsed.metadata.updatedAt ?? Date.now(),
    version: parsed.metadata.version ?? 1,
  };

  // Ensure pages array exists
  if (!Array.isArray(parsed.pages)) parsed.pages = [];

  return parsed as BuilderState;
}
