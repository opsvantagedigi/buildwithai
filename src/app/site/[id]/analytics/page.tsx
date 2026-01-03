// src/app/site/[id]/analytics/page.tsx

import TrafficGraph from "@/components/analytics/TrafficGraph";
import SummaryCards from "@/components/analytics/SummaryCards";
import HeatmapViewer from "@/components/analytics/HeatmapViewer";
import ReplayViewer from "@/components/analytics/ReplayViewer";
import FunnelsPanel from "@/components/analytics/FunnelsPanel";
import ConversionsPanel from "@/components/analytics/ConversionsPanel";

async function fetchRollups(siteId: string) {
  const today = new Date();
  const dates = [...Array(7)].map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    return d.toISOString().slice(0, 10);
  });

  const rollups = [];

  for (const date of dates) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/analytics/rollup`,
      {
        method: "POST",
        body: JSON.stringify({ siteId, date }),
      }
    );

    const data = await res.json().catch(() => null);
    if (data?.rollup) rollups.push(data.rollup);
  }

  return rollups.reverse();
}

async function fetchEvents(siteId: string, date: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/analytics/rollup`,
    {
      method: "POST",
      body: JSON.stringify({ siteId, date }),
    }
  );

  const data = await res.json().catch(() => null);
  return data?.events || [];
}

async function fetchHeatmap(siteId: string, date: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/analytics/replay?siteId=${siteId}&sessionId=dummy&date=${date}`
  );

  const data = await res.json().catch(() => null);
  return data?.heatmap || [];
}

async function fetchReplay(siteId: string, sessionId: string, date: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/analytics/replay?siteId=${siteId}&sessionId=${sessionId}&date=${date}`
  );

  const data = await res.json().catch(() => null);
  return data || null;
}

async function fetchFunnels(siteId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/analytics/funnels?siteId=${siteId}`
  );

  const data = await res.json().catch(() => null);
  return data?.funnels || [];
}

async function fetchConversions(siteId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/analytics/conversions?siteId=${siteId}`
  );

  const data = await res.json().catch(() => null);
  return data?.conversions || [];
}

export default async function AnalyticsPage({
  params,
}: {
  params: { id: string };
}) {
  const siteId = params.id;

  const rollups = await fetchRollups(siteId);
  const funnels = await fetchFunnels(siteId);
  const conversions = await fetchConversions(siteId);

  // Use today's date for heatmap + replay
  const today = new Date().toISOString().slice(0, 10);

  const heatmap = await fetchHeatmap(siteId, today);

  // Replay: we don't know sessionId yet, so skip until UI selects one
  const replay: any = null;

  return (
    <div className="p-8 space-y-12">
      <h1 className="text-3xl font-bold">Analytics</h1>

      <SummaryCards rollups={rollups} />

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Traffic (Last 7 Days)</h2>
        <TrafficGraph rollups={rollups} />
      </div>

      {/* Top Pages + Referrers + Devices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Top Pages</h2>
          <TopPages rollups={rollups} />
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Top Referrers</h2>
          <TopReferrers rollups={rollups} />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Devices</h2>
        <DeviceBreakdown rollups={rollups} />
      </div>

      {/* Funnels */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Funnels</h2>
        <FunnelsPanel funnels={funnels} events={[]} />
      </div>

      {/* Conversions */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Conversions</h2>
        <ConversionsPanel conversions={conversions} events={[]} />
      </div>

      {/* Heatmap */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Heatmap</h2>
        <HeatmapViewer heatmap={heatmap} />
      </div>

      {/* Replay */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Replay</h2>
        <ReplayViewer metadata={replay?.metadata} timeline={replay?.timeline} />
      </div>
    </div>
  );
}

function TopPages({ rollups }: any) {
  const pages: Record<string, number> = {};

  rollups.forEach((r: any) => {
    Object.entries(r.paths).forEach(([path, data]: any) => {
      pages[path] = (pages[path] || 0) + data.pageviews;
    });
  });

  const sorted = Object.entries(pages).sort((a, b) => b[1] - a[1]);

  return (
    <ul className="space-y-2">
      {sorted.map(([path, count]) => (
        <li key={path} className="flex justify-between">
          <span>{path}</span>
          <span className="font-semibold">{count}</span>
        </li>
      ))}
    </ul>
  );
}

function TopReferrers({ rollups }: any) {
  const refs: Record<string, number> = {};

  rollups.forEach((r: any) => {
    Object.entries(r.referrers).forEach(([ref, data]: any) => {
      refs[ref] = (refs[ref] || 0) + data.pageviews;
    });
  });

  const sorted = Object.entries(refs).sort((a, b) => b[1] - a[1]);

  return (
    <ul className="space-y-2">
      {sorted.map(([ref, count]) => (
        <li key={ref} className="flex justify-between">
          <span>{ref}</span>
          <span className="font-semibold">{count}</span>
        </li>
      ))}
    </ul>
  );
}

function DeviceBreakdown({ rollups }: any) {
  const totals = { desktop: 0, mobile: 0, tablet: 0, other: 0 };

  rollups.forEach((r: any) => {
    totals.desktop += r.devices.desktop;
    totals.mobile += r.devices.mobile;
    totals.tablet += r.devices.tablet;
    totals.other += r.devices.other;
  });

  return (
    <ul className="space-y-2">
      {Object.entries(totals).map(([device, count]) => (
        <li key={device} className="flex justify-between">
          <span className="capitalize">{device}</span>
          <span className="font-semibold">{count}</span>
        </li>
      ))}
    </ul>
  );
}
