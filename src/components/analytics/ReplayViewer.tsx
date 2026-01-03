// src/components/analytics/ReplayViewer.tsx

export default function ReplayViewer({ metadata, timeline }: any) {
  if (!timeline || timeline.length === 0) {
    return <p className="text-gray-500">No replay data available.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="text-lg font-semibold">Session Info</h3>
        <p>Session ID: {metadata.sessionId}</p>
        <p>Duration: {Math.round((metadata.endedAt - metadata.startedAt) / 1000)}s</p>
        <p>Pageviews: {metadata.pageviewCount}</p>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Timeline</h3>
        <ul className="space-y-2">
          {timeline.map((e: any) => (
            <li key={e.id} className="flex justify-between">
              <span>{new Date(e.timestamp).toLocaleTimeString()}</span>
              <span className="font-semibold">{e.type}</span>
              <span>{e.path || ""}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
