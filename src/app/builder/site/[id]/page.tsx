"use client"

import React, { useState } from "react"
import Sidebar from '@/components/builder/Sidebar'
import Canvas from '@/components/builder/Canvas'
import BlockEditorSidebar from '@/components/builder/BlockEditorSidebar'

type Props = { params: { id: string } }

type BuilderBlock = { id: string; type: string; data: any }
type Page = { id: string; title: string; blocks: BuilderBlock[] }
type AppState = { pages: Page[]; activePageId: string }

export default function BuilderCanvas({ params }: Props){
  const initialBlocks: BuilderBlock[] = [
    { id: 'b1', type: 'hero', data: { heading: 'Welcome', subheading: 'Start editing' } }
  ]

  const [state, setState] = useState<AppState>({
    pages: [{ id: 'page-1', title: 'Home', blocks: initialBlocks }],
    activePageId: 'page-1',
  })

  const activePage = state.pages.find((p) => p.id === state.activePageId) ?? state.pages[0]

  const blocks: BuilderBlock[] = activePage?.blocks ?? []
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)

  function addBlock(type: string) {
    if (!activePage) return
    setState((prev) => ({
      ...prev,
      pages: prev.pages.map((p) =>
        p.id === activePage.id
          ? { ...p, blocks: [...p.blocks, { id: crypto.randomUUID(), type, data: {} }] }
          : p
      ),
    }))
  }

  function updateBlockData(pageId: string, blockId: string, data: any) {
    setState((prev) => ({
      ...prev,
      pages: prev.pages.map((p) =>
        p.id === pageId
          ? { ...p, blocks: p.blocks.map((b) => (b.id === blockId ? { ...b, data } : b)) }
          : p
      ),
    }))
  }

  function removeBlock(id: string) {
    if (!activePage) return
    setState((prev) => ({
      ...prev,
      pages: prev.pages.map((p) =>
        p.id === activePage.id ? { ...p, blocks: p.blocks.filter((b) => b.id !== id) } : p
      ),
    }))
    if (selectedBlockId === id) setSelectedBlockId(null)
  }

  function moveBlock(pageId: string, blockId: string, direction: "up" | "down") {
    setState((prev) => {
      const pages = prev.pages.map((p) => {
        if (p.id !== pageId) return p

        const index = p.blocks.findIndex((b) => b.id === blockId)
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

  function duplicateBlock(pageId: string, block: BuilderBlock) {
    setState((prev) => {
      const pages = prev.pages.map((p) => {
        if (p.id !== pageId) return p

        const newBlock = { ...block, id: crypto.randomUUID() }

        return { ...p, blocks: [...p.blocks, newBlock] }
      })

      return { ...prev, pages }
    })
  }

  function deleteBlock(pageId: string, blockId: string) {
    setState((prev) => {
      const pages = prev.pages.map((p) =>
        p.id === pageId ? { ...p, blocks: p.blocks.filter((b) => b.id !== blockId) } : p
      )
      return { ...prev, pages }
    })
    if (selectedBlockId === blockId) setSelectedBlockId(null)
  }

  return (
    <div className="flex h-screen">
      <Sidebar blocks={blocks} onAddBlock={addBlock} onRemoveBlock={removeBlock} onSelectBlock={(id) => setSelectedBlockId(id)} />

      <div className="flex-1 p-6 overflow-auto flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Editing: {activePage?.title ?? "Untitled page"}</h1>
          </div>
        </div>

        <Canvas blocks={blocks} onSelectBlock={(id) => setSelectedBlockId(id)} />
      </div>

      <BlockEditorSidebar
        block={blocks.find((b) => b.id === selectedBlockId) ?? null}
        onChange={(data) => {
          if (!selectedBlockId || !activePage) return

          // Duplicate request
          if ((data as any).__duplicate__) {
            const original = blocks.find((b) => b.id === selectedBlockId)
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
