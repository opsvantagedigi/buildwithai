// src/components/analytics/SummaryCards.tsx

export default function SummaryCards({ rollups }: any) {
  const totalPageviews = rollups.reduce((sum: number, r: any) => sum + (r?.pageviews || 0), 0);
  const totalUniques = rollups.reduce((sum: number, r: any) => sum + (r?.uniques || 0), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold">Total Pageviews</h3>
        <p className="text-3xl font-bold mt-2">{totalPageviews}</p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold">Unique Visitors</h3>
        <p className="text-3xl font-bold mt-2">{totalUniques}</p>
      </div>
    </div>
  );
}
