// src/components/analytics/TrafficGraph.tsx

export default function TrafficGraph({ rollups }: any) {
  const values = rollups.map((r: any) => r.pageviews || 0);
  const max = Math.max(...values, 1);

  const points = values
    .map((v: number, i: number) => {
      const x = (i / Math.max(1, values.length - 1)) * 300;
      const y = 100 - (v / max) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width="100%" height="120" viewBox="0 0 300 120">
      <polyline fill="none" stroke="#2563eb" strokeWidth="3" points={points} />
    </svg>
  );
}
