"use client";

import React from "react";
import Hero from "@/components/marketing/Hero";
import FeatureGrid from "@/components/marketing/FeatureGrid";
import CTA from "@/components/marketing/CTA";
import FAQ from "@/components/marketing/FAQ";
import SocialProof from "@/components/marketing/SocialProof";

type Block = { id: string; type: string; data: any };

export default function BlockRenderer({ block }: { block: Block }) {
  const { type, data } = block;

  if (type === "hero") return <Hero {...(data || {})} />;
  if (type === "features") return <FeatureGrid items={(data?.features) || []} />;
  if (type === "cta") return <CTA {...(data || {})} />;
  if (type === "faq") return <FAQ items={(data?.items) || []} />;
  if (type === "social-proof") return <SocialProof {...(data || {})} />;

  if (type === "text") return <div className="prose" dangerouslySetInnerHTML={{ __html: data?.html || "<p>Text block</p>" }} />;

  return <div className="text-sm text-slate-500">Unknown block type: {type}</div>;
}

