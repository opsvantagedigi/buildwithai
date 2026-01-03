"use client"

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Canvas from "@/components/builder/Canvas";
import { Sidebar } from "@/components/builder/Sidebar";
import BlockEditorSidebar from "@/components/builder/BlockEditorSidebar";
import { loadSiteState } from "@/lib/builder/load";
import { saveSiteState } from "@/lib/builder/save";
import { registerSite, updateSiteTimestamp } from "@/lib/sites/registry";
import { getSite } from "@/lib/sites/getSite";
import type { PublishMetadata } from "@/types/publish";
import type { PublishHistoryEntry, PublishHistory } from "@/types/publish";
import type { BuilderState } from "@/types/builder";

type Props = { params: { id: string } };

export default function BuilderCanvas({ params }: Props) {
  const siteId = params.id;

  const [state, setState] = useState<BuilderState | null>(null);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishMetadata, setPublishMetadata] =
    useState<PublishMetadata | null>(null);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [publishHistory, setPublishHistory] = useState<
    PublishHistoryEntry[] | null
  >(null);
  const [showHistory, setShowHistory] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [restoreError, setRestoreError] = useState<string | null>(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isStaging, setIsStaging] = useState(false);
  const [stagingUrl, setStagingUrl] = useState<string | null>(null);
  const [stagingError, setStagingError] = useState<string | null>(null);
  const [site, setSite] = useState<{ id: string; name: string; createdAt: number; updatedAt: number } | null>(null);
  const [expandedChangelogVersion, setExpandedChangelogVersion] = useState<
    number | null
  >(null);
  const [changelogContent, setChangelogContent] = useState<
    Record<number, string | null>
  >({});
  const [expandedReleaseNotesVersion, setExpandedReleaseNotesVersion] = useState<number | null>(null);
  const [releaseNotesContent, setReleaseNotesContent] = useState<Record<number, string | null>>({});

  useEffect(() => {
    async function init() {
      const kvState = await loadSiteState(siteId);
      if (kvState) {
        setState(kvState);
        return;
      }

      const raw = localStorage.getItem(`buildwithai:site:${siteId}`);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          const initial: BuilderState = {
            metadata: {
              id: siteId,
              name: parsed?.metadata?.name ?? "Untitled",
              createdAt: parsed?.metadata?.createdAt ?? Date.now(),
              updatedAt: parsed?.metadata?.updatedAt ?? Date.now(),
              version: parsed?.metadata?.version ?? 1,
            },
            pages:
              parsed.pages ?? [{ id: "page-1", title: "Home", slug: "/", blocks: [] }],
            activePageId: parsed.activePageId ?? "page-1",
          };

          setState(initial);

          // Save to KV immediately
          await saveSiteState(siteId, initial);
        } catch (e) {
          // ignore
        }
      }
    }

    init();
  }, [siteId]);

  useEffect(() => {
    async function load() {
      const data = await getSite(siteId);
      setSite(data);

      // Auto-register site in dashboard registry
      if (data?.name) {
        await registerSite(siteId, data.name);
        await updateSiteTimestamp(siteId);
      }
    }
    load();
  }, [siteId]);

  // AUTOSAVE (debounced)
  useEffect(() => {
    if (!state?.metadata) return;

    const timeout = setTimeout(() => {
      saveSiteState(siteId, state);
    }, 500);

    return () => clearTimeout(timeout);
  }, [state, siteId]);

  async function handlePublish() {
    if (!state) return;
    setIsPublishing(true);
    setPublishError(null);

    try {
      const res = await fetch("/api/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ siteId }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setPublishError(
          data?.error ?? `Publish failed with status ${res.status}`
        );
        setIsPublishing(false);
        return;
      }

      const data = await res.json();
      if (data?.publish) {
        setPublishMetadata(data.publish as PublishMetadata);
      }

      if (data?.history) {
        setPublishHistory(data.history);
      }
    } catch (error: any) {
      setPublishError(error?.message ?? "Unexpected error during publish");
    } finally {
      setIsPublishing(false);
    }
  }

  async function handlePreview() {
    setIsPreviewing(true);
    setPreviewUrl(null);

    try {
      const res = await fetch("/api/publish/preview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ siteId }),
      });

      const data = await res.json();

      if (data?.previewUrl) {
        setPreviewUrl(data.previewUrl);
      }
    } catch (error) {
      console.error("Preview error", error);
    } finally {
      setIsPreviewing(false);
    }
  }

  async function handleStaging() {
    setIsStaging(true);
    setStagingUrl(null);
    setStagingError(null);

    try {
      const res = await fetch("/api/publish/staging", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ siteId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStagingError(data?.error ?? "Staging deploy failed");
        setIsStaging(false);
        return;
      }

      if (data?.stagingUrl) {
        setStagingUrl(data.stagingUrl);
      }
    } catch (error: any) {
      setStagingError(error?.message ?? "Unexpected staging error");
    } finally {
      setIsStaging(false);
    }
  }

  async function loadHistory() {
    const res = await fetch(`/api/publish/history?siteId=${siteId}`);
    if (!res.ok) return;
    const data = await res.json();
    if (data?.history) setPublishHistory(data.history);
  }

  async function handleRestore(version: number) {
    setIsRestoring(true);
    setRestoreError(null);

    try {
      const res = await fetch("/api/publish/rollback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ siteId, version }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setRestoreError(
          data?.error ?? `Restore failed with status ${res.status}`
        );
        setIsRestoring(false);
        return;
      }

      // Reload page to reflect restored state
      window.location.reload();
    } catch (error: any) {
      setRestoreError(error?.message ?? "Unexpected restore error");
    } finally {
      setIsRestoring(false);
    }
  }

  async function loadChangelog(version: number) {
    // Return cached if present
    if (changelogContent[version] !== undefined) return;

    const res = await fetch(
      `/api/publish/changelog?siteId=${siteId}&version=${version}`
    );
    if (!res.ok) {
      setChangelogContent((prev) => ({
        ...prev,
        [version]: null,
      }));
      return;
    }
    const data = await res.json();
    setChangelogContent((prev) => ({
      ...prev,
      [version]: data?.changelog ?? null,
    }));
  }

  async function loadReleaseNotes(version: number) {
    if (releaseNotesContent[version] !== undefined) return;

    const res = await fetch(
      `/api/publish/release-notes?siteId=${siteId}&version=${version}`
    );

    if (!res.ok) {
      setReleaseNotesContent((prev) => ({
        ...prev,
        [version]: null,
      }));
      return;
    }

    const data = await res.json();
    setReleaseNotesContent((prev) => ({
      ...prev,
      [version]: data?.releaseNotes ?? null,
    }));
  }

  const activePage = state?.pages.find((p) => p.id === state.activePageId) ?? state?.pages[0];

  const blocks = activePage?.blocks ?? [];

  function addBlock(type: string) {
    if (!activePage) return
    setState((prev: any) => ({
      ...prev,
      pages: prev.pages.map((p: any) =>
        p.id === activePage.id
          ? { ...p, blocks: [...p.blocks, { id: crypto.randomUUID(), type, data: {} }] }
          : p
      ),
    }))
  }

  function updateBlockData(pageId: string, blockId: string, data: any) {
    setState((prev: any) => ({
      ...prev,
      pages: prev.pages.map((p: any) =>
        p.id === pageId
          ? { ...p, blocks: p.blocks.map((b: any) => (b.id === blockId ? { ...b, data } : b)) }
          : p
      ),
    }))
  }

  function removeBlock(id: string) {
    if (!activePage) return
    setState((prev: any) => ({
      ...prev,
      pages: prev.pages.map((p: any) =>
        p.id === activePage.id ? { ...p, blocks: p.blocks.filter((b: any) => b.id !== id) } : p
      ),
    }))
    if (selectedBlockId === id) setSelectedBlockId(null)
  }

  function moveBlock(pageId: string, blockId: string, direction: "up" | "down") {
    setState((prev: any) => {
      const pages = prev.pages.map((p: any) => {
        if (p.id !== pageId) return p

        const index = p.blocks.findIndex((b: any) => b.id === blockId)
        if (index === -1) return p

        const newBlocks = [...p.blocks]

        if (direction === "up" && index > 0) {
          const temp = newBlocks[index - 1]
          newBlocks[index - 1] = newBlocks[index]
          newBlocks[index] = temp
        }

        if (direction === "down" && index < newBlocks.length - 1) {
          const temp = newBlocks[index + 1]
          newBlocks[index + 1] = newBlocks[index]
          newBlocks[index] = temp
        }

        return { ...p, blocks: newBlocks }
      })

      return { ...prev, pages }
    })
  }

  function duplicateBlock(pageId: string, block: any) {
    setState((prev: any) => {
      const pages = prev.pages.map((p: any) => {
        if (p.id !== pageId) return p

        const newBlock = { ...block, id: crypto.randomUUID() }

        return { ...p, blocks: [...p.blocks, newBlock] }
      })

      return { ...prev, pages }
    })
  }

  function deleteBlock(pageId: string, blockId: string) {
    setState((prev: any) => {
      const pages = prev.pages.map((p: any) =>
        p.id === pageId ? { ...p, blocks: p.blocks.filter((b: any) => b.id !== blockId) } : p
      )
      return { ...prev, pages }
    })
    if (selectedBlockId === blockId) setSelectedBlockId(null)
  }

  return (
    <div className="flex h-screen">
      <Sidebar blocks={blocks} selectedBlockId={selectedBlockId} onAddBlock={addBlock} onRemoveBlock={removeBlock} onSelectBlock={(id) => setSelectedBlockId(id)} />

      <div className="flex-1 p-6 overflow-auto flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-xl font-semibold truncate">
              Editing: {activePage?.title ?? "Untitled page"}
            </h1>
            {publishMetadata?.lastPublishedAt && (
              <p className="text-xs text-slate-500 mt-1">
                Last published: {" "}
                {new Date(publishMetadata.lastPublishedAt).toLocaleString()}
                {publishMetadata.lastPublishedVersion
                  ? ` • Version ${publishMetadata.lastPublishedVersion}`
                  : ""}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end gap-1">
            <button
              type="button"
              className="px-3 py-1 text-xs rounded bg-purple-700 hover:bg-purple-600 disabled:opacity-50"
              disabled={isStaging}
              onClick={handleStaging}
            >
              {isStaging ? "Staging…" : "Staging"}
            </button>

            <button
              type="button"
              className="px-3 py-1 text-xs rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-50"
              disabled={isPreviewing}
              onClick={handlePreview}
            >
              {isPreviewing ? "Previewing…" : "Preview"}
            </button>
            <button
              type="button"
              className="inline-flex items-center rounded-full bg-slate-900 text-white text-xs px-4 py-1.5 disabled:opacity-60"
              onClick={handlePublish}
              disabled={isPublishing || !state}
            >
              {isPublishing ? "Publishing…" : "Publish"}
            </button>

            <button
              type="button"
              className="text-[10px] text-slate-400 underline"
              onClick={() => {
                setShowHistory(!showHistory);
                if (!publishHistory) loadHistory();
              }}
            >
              {showHistory ? "Hide history" : "View history"}
            </button>
            {publishError && (
              <p className="text-[10px] text-red-500 max-w-xs text-right">
                {publishError}
              </p>
            )}
          </div>
        </div>

        {previewUrl && (
          <div className="mt-2 text-xs text-slate-300">
            Preview ready: {" "}
            <a
              href={previewUrl}
              target="_blank"
              className="underline text-slate-200"
            >
              {previewUrl}
            </a>
          </div>
        )}

        {stagingUrl && (
          <div className="mt-2 text-xs text-purple-300">
            Staging ready: {" "}
            <a
              href={stagingUrl}
              target="_blank"
              className="underline text-purple-200"
            >
              {stagingUrl}
            </a>
          </div>
        )}

        {stagingError && (
          <div className="mt-2 text-xs text-red-400">
            {stagingError}
          </div>
        )}

        {showHistory && publishHistory && (
          <div className="mt-4 border border-slate-800 rounded-lg p-3 bg-slate-900/40">
            <h2 className="text-sm font-semibold mb-2">Publish History</h2>
            <ul className="space-y-2 text-xs">
              {publishHistory.map((entry, i) => (
                <li key={i} className="border-b border-slate-800 pb-1">
                  <div className="flex items-center justify-between">
                    <span>
                      Version {entry.version} — {" "}
                      {new Date(entry.timestamp).toLocaleString()}
                      {entry.rollback ? " (rollback)" : ""}
                    </span>
                    <div className="flex items-center gap-3">
                      {entry.url && (
                        <a
                          href={entry.url}
                          target="_blank"
                          className="text-slate-400 underline"
                        >
                          View
                        </a>
                      )}

                      <button
                        type="button"
                        className="text-slate-300 underline disabled:opacity-50"
                        disabled={isRestoring}
                        onClick={() => handleRestore(entry.version)}
                      >
                        Restore
                      </button>

                      <button
                        type="button"
                        className="text-slate-400 text-[10px] underline"
                        onClick={() => {
                          const next =
                            expandedChangelogVersion === entry.version
                              ? null
                              : entry.version;
                          setExpandedChangelogVersion(next);
                          if (next !== null) loadChangelog(next);
                        }}
                      >
                        {expandedChangelogVersion === entry.version
                          ? "Hide changelog"
                          : "View changelog"}
                      </button>

                      <button
                        type="button"
                        className="text-slate-400 text-[10px] underline"
                        onClick={() => {
                          const next =
                            expandedReleaseNotesVersion === entry.version
                              ? null
                              : entry.version;
                          setExpandedReleaseNotesVersion(next);
                          if (next !== null) loadReleaseNotes(next);
                        }}
                      >
                        {expandedReleaseNotesVersion === entry.version
                          ? "Hide release notes"
                          : "View release notes"}
                      </button>
                    </div>
                  </div>

                  {expandedChangelogVersion === entry.version && (
                    <div className="mt-1 text-[11px] text-slate-300 whitespace-pre-line">
                      {changelogContent[entry.version] === undefined && (
                        <span className="text-slate-500">Loading changelog…</span>
                      )}
                      {changelogContent[entry.version] === null && (
                        <span className="text-slate-500">No changelog available for this version.</span>
                      )}
                      {changelogContent[entry.version] && changelogContent[entry.version]}
                    </div>
                  )}

                  {expandedReleaseNotesVersion === entry.version && (
                    <div className="mt-1 text-[11px] text-slate-300 whitespace-pre-line">
                      {releaseNotesContent[entry.version] === undefined && (
                        <span className="text-slate-500">Loading release notes…</span>
                      )}
                      {releaseNotesContent[entry.version] === null && (
                        <span className="text-slate-500">No release notes available for this version.</span>
                      )}
                      {releaseNotesContent[entry.version] && releaseNotesContent[entry.version]}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <Canvas blocks={blocks} selectedBlockId={selectedBlockId} onSelectBlock={(id) => setSelectedBlockId(id)} />
      </div>

      <BlockEditorSidebar
        block={blocks.find((b: any) => b.id === selectedBlockId) ?? null}
        onChange={(data: any) => {
          if (!selectedBlockId || !activePage) return

          // Duplicate request
          if ((data as any).__duplicate__) {
            const original = blocks.find((b: any) => b.id === selectedBlockId)
            if (original) duplicateBlock(activePage.id, original)
            return
          }

          updateBlockData(activePage.id, selectedBlockId, data)
        }}
        onRegenerate={() => {
          /* handled in Step 3 */
        }}
        onMoveUp={() => {
          if (!selectedBlockId || !activePage) return
          moveBlock(activePage.id, selectedBlockId, "up")
        }}
        onMoveDown={() => {
          if (!selectedBlockId || !activePage) return
          moveBlock(activePage.id, selectedBlockId, "down")
        }}
        onDelete={() => {
          if (!selectedBlockId || !activePage) return
          deleteBlock(activePage.id, selectedBlockId)
        }}
      />
    </div>
  )
}
