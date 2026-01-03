// src/components/analytics/ConversionsPanel.tsx

export default function ConversionsPanel({ conversions, events }: any) {
  if (!conversions || conversions.length === 0) {
    return <p className="text-gray-500">No conversion goals defined.</p>;
  }

  const counts: Record<string, number> = {};

  events.forEach((e: any) => {
    if (e.type === "conversion") {
      counts[e.goal] = (counts[e.goal] || 0) + 1;
    }
  });

  return (
    <div className="space-y-8">
      {conversions.map((c: any) => (
        <div key={c.id} className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4">{c.name}</h3>
          <p className="text-3xl font-bold">{counts[c.name] || 0}</p>
        </div>
      ))}
    </div>
  );
}
