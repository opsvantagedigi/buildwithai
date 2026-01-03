"use client";

import React, { useState } from "react";
import type { Block as BuilderBlock } from "@/types/builder";
import { ImageField } from "./editors/ImageField";
import { TextField } from "./editors/TextField";
import { FeatureListEditor } from "./editors/FeatureListEditor";
import { FAQEditor } from "./editors/FAQEditor";
import { TestimonialEditor } from "./editors/TestimonialEditor";
import { ToneSelector } from "./editors/ToneSelector";
import { AIRewriteButton } from "./editors/AIRewriteButton";

type Props = {
  block: BuilderBlock | null;
  onChange: (data: Record<string, any>) => void;
  onRegenerate: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
};

export default function BlockEditorSidebar({
  block,
  onChange,
  onRegenerate,
  onMoveUp,
  onMoveDown,
  onDelete,
}: Props) {
  if (!block) {
    return (
      <aside className="w-96 border-l bg-slate-50 p-6 text-sm text-slate-500">
        Select a section to edit its content.
      </aside>
    );
  }

  const [localData, setLocalData] = useState(block.data ?? {});

  function updateField(key: string, value: any) {
    const updated = { ...localData, [key]: value };
    setLocalData(updated);
    onChange(updated);
  }

  function renderFields() {
    if (!block) return null;
    switch (block.type) {
      case "hero":
        return (
          <div className="space-y-4">
            <TextField
              label="Heading"
              value={localData.heading}
              onChange={(v) => updateField("heading", v)}
            />
            <AIRewriteButton
              text={localData.heading}
              onRewrite={(v) => updateField("heading", v)}
            />

            <TextField
              label="Subheading"
              value={localData.subheading}
              onChange={(v) => updateField("subheading", v)}
            />
            <AIRewriteButton
              text={localData.subheading}
              onRewrite={(v) => updateField("subheading", v)}
            />

            <TextField
              label="Primary CTA"
              value={localData.primaryCta}
              onChange={(v) => updateField("primaryCta", v)}
            />

            <TextField
              label="Secondary CTA"
              value={localData.secondaryCta}
              onChange={(v) => updateField("secondaryCta", v)}
            />

            <ImageField
              label="Hero Image"
              value={localData.image}
              onChange={(v) => updateField("image", v)}
            />
          </div>
        );

      case "features":
        return (
          <div className="space-y-4">
            <TextField
              label="Title"
              value={localData.title}
              onChange={(v) => updateField("title", v)}
            />
            <AIRewriteButton
              text={localData.title}
              onRewrite={(v) => updateField("title", v)}
            />

            <TextField
              label="Subtitle"
              value={localData.subtitle}
              onChange={(v) => updateField("subtitle", v)}
            />
            <AIRewriteButton
              text={localData.subtitle}
              onRewrite={(v) => updateField("subtitle", v)}
            />

            <FeatureListEditor
              items={localData.items ?? []}
              onChange={(v) => updateField("items", v)}
            />
          </div>
        );

      case "faq":
        return (
          <FAQEditor
            items={localData.items ?? []}
            onChange={(v) => updateField("items", v)}
          />
        );

      case "testimonials":
        return (
          <TestimonialEditor
            testimonials={localData.testimonials ?? []}
            onChange={(v) => updateField("testimonials", v)}
          />
        );

      case "cta":
        return (
          <div className="space-y-4">
            <TextField
              label="Heading"
              value={localData.heading}
              onChange={(v) => updateField("heading", v)}
            />
            <AIRewriteButton
              text={localData.heading}
              onRewrite={(v) => updateField("heading", v)}
            />

            <TextField
              label="Subheading"
              value={localData.subheading}
              onChange={(v) => updateField("subheading", v)}
            />
            <AIRewriteButton
              text={localData.subheading}
              onRewrite={(v) => updateField("subheading", v)}
            />

            <TextField
              label="Primary CTA"
              value={localData.primaryCta}
              onChange={(v) => updateField("primaryCta", v)}
            />

            <TextField
              label="Secondary CTA"
              value={localData.secondaryCta}
              onChange={(v) => updateField("secondaryCta", v)}
            />
          </div>
        );

      default:
        return (
          <p className="text-xs text-slate-500">
            No editor available for block type: {block.type}
          </p>
        );
    }
  }

  return (
    <aside className="w-96 border-l bg-white p-6 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Edit Section</h2>

      <div className="space-y-6">{renderFields()}</div>

      <div className="mt-8 space-y-4">
        <ToneSelector
          value={localData.tone}
          onChange={(v) => updateField("tone", v)}
        />

        <button
          onClick={async () => {
            try {
              const res = await fetch("/api/ai/section/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  section: {
                    id: block.id,
                    type: block.type,
                    data: localData,
                  },
                  context: {
                    tone: localData.tone,
                  },
                }),
              });

              const json = await res.json();

              if (json?.section?.data) {
                // Merge AI output with existing data (preserve user edits)
                const merged = {
                  ...localData,
                  ...json.section.data,
                };
                setLocalData(merged);
                onChange(merged);
              }
            } catch (err) {
              console.error("[AI_REGENERATE_ERROR]", err);
            }
          }}
          className="w-full px-4 py-2 rounded bg-slate-900 text-white text-sm"
        >
          Regenerate with AI
        </button>

        <div className="flex items-center justify-between text-xs text-slate-600">
          <button onClick={onMoveUp} className="hover:text-slate-900">
            ↑ Move Up
          </button>
          <button onClick={onMoveDown} className="hover:text-slate-900">
            ↓ Move Down
          </button>
          <button
            onClick={() => {
              // Duplicate block by cloning localData
              const clone = { ...localData };
              onChange({ __duplicate__: true, ...clone });
            }}
            className="hover:text-slate-900"
          >
            Duplicate
          </button>
          <button onClick={onDelete} className="text-red-500 hover:text-red-700">
            Delete
          </button>
        </div>
      </div>
    </aside>
  );
}
