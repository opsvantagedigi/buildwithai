"use client"

import React, { useState, useEffect } from "react"
import { useParams } from "next/navigation";
import Canvas from "@/components/builder/Canvas";
import { Sidebar } from "@/components/builder/Sidebar";
import BlockEditorSidebar from "@/components/builder/BlockEditorSidebar";
import { loadSiteState } from "@/lib/builder/load";
import { saveSiteState } from "@/lib/builder/save";

type Props = { params: { id: string } }

export default function BuilderCanvas({ params }: Props){
  const siteId = params.id

  const initialBlocks = [
    { id: 'b1', type: 'hero', data: { heading: 'Welcome', subheading: 'Start editing' } }
  ]

  const [state, setState] = useState<any>({
    metadata: { id: siteId, createdAt: Date.now(), updatedAt: Date.now(), name: 'Untitled', version: 1 },
    pages: [{ id: 'page-1', title: 'Home', slug: '/', blocks: initialBlocks }],
    activePageId: 'page-1',
  })

  useEffect(() => {
    async function init() {
      // 1. Try KV first
      const kvState = await loadSiteState(siteId);
      if (kvState) {
        setState(kvState);
        return;
      }

      // 2. Fallback to localStorage (AI-generated)
      const raw = localStorage.getItem(`buildwithai:site:${siteId}`);
      if (raw) {
        const parsed = JSON.parse(raw);
        const initial = {
          metadata: {
            id: siteId,
            name: parsed?.metadata?.name ?? 'Untitled',
            createdAt: parsed?.metadata?.createdAt ?? Date.now(),
            updatedAt: parsed?.metadata?.updatedAt ?? Date.now(),
            version: parsed?.metadata?.version ?? 1,
          },
          pages: parsed.pages ?? [{ id: 'page-1', title: 'Home', slug: '/', blocks: initialBlocks }],
          activePageId: parsed.activePageId ?? 'page-1',
        }
        setState(initial);

        // Save to KV immediately
        await saveSiteState(siteId, initial);
      }
    }

    init();
  }, [siteId]);

  // AUTOSAVE (debounced)
  useEffect(() => {
    if (!state?.metadata) return;

    const timeout = setTimeout(() => {
      saveSiteState(siteId, state);
    }, 500);

    return () => clearTimeout(timeout);
  }, [state, siteId]);

  const activePage = state.pages.find((p: any) => p.id === state.activePageId) ?? state.pages[0]

  const blocks = activePage?.blocks ?? []
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)

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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Editing: {activePage?.title ?? "Untitled page"}</h1>
          </div>
        </div>

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
