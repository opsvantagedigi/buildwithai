// src/components/analytics/FunnelsPanel.tsx

export default function FunnelsPanel({ funnels, events }: any) {
  if (!funnels || funnels.length === 0) {
    return <p className="text-gray-500">No funnels defined.</p>;
  }

  return (
    <div className="space-y-8">
      {funnels.map((f: any) => {
        const counts: Record<string, number> = {};

        events.forEach((e: any) => {
          if (e.type === "funnel_step" && e.funnelId === f.id) {
            counts[e.stepId] = (counts[e.stepId] || 0) + 1;
          }
        });

        return (
          <div key={f.id} className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold mb-4">{f.name}</h3>

            <ul className="space-y-2">
              {f.steps.map((s: any) => (
                <li key={s.id} className="flex justify-between">
                  <span>{s.name}</span>
                  <span className="font-semibold">{counts[s.id] || 0}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
