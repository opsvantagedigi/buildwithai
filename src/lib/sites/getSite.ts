import { loadSiteState } from "@/lib/builder/load";

export async function getSite(siteId: string) {
  const state = await loadSiteState(siteId);
  if (!state) return null;

  return {
    id: siteId,
    name: state.metadata?.name ?? "Untitled",
    createdAt: state.metadata?.createdAt ?? Date.now(),
    updatedAt: state.metadata?.updatedAt ?? Date.now(),
  };
}
