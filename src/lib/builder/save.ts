import { kv } from "@/lib/kv";
import type { BuilderState } from "@/types/builder";

const KEY_PREFIX = "buildwithai:site:";

export async function saveSiteState(
  siteId: string,
  state: BuilderState
): Promise<void> {
  const key = `${KEY_PREFIX}${siteId}`;
  // Ensure metadata exists
  const metadata = state.metadata ?? {
    id: siteId,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    version: 1,
  };

  // Increment version + update timestamp
  const nextMetadata = {
    ...metadata,
    updatedAt: Date.now(),
    version: (metadata.version ?? 0) + 1,
  };

  const payload = JSON.stringify({
    ...state,
    metadata: nextMetadata,
  });

  await kv.set(key, payload);
}

// Backwards-compatible adapter expected by templates create route
export async function saveSite(siteId: string, state: BuilderState) {
  return saveSiteState(siteId, state);
}
