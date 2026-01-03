// src/components/analytics/HeatmapViewer.tsx

export default function HeatmapViewer({ heatmap }: any) {
  if (!heatmap || heatmap.length === 0) {
    return <p className="text-gray-500">No heatmap data available.</p>;
  }

  return (
    <div className="space-y-8">
      {heatmap.map((page: any) => (
        <div key={page.path}>
          <h3 className="text-lg font-semibold mb-2">{page.path}</h3>

          <div
            className="relative border rounded-lg overflow-hidden"
            style={{
              width: "400px",
              height: "400px",
              background: "#f9fafb",
            }}
          >
            {page.buckets.map((b: any, i: number) => {
              const intensity = Math.min(1, b.count / 10);
              const color = `rgba(255, 0, 0, ${intensity})`;

              const cellSizeX = 400 / page.width;
              const cellSizeY = 400 / page.height;

              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: b.x * cellSizeX,
                    top: b.y * cellSizeY,
                    width: cellSizeX,
                    height: cellSizeY,
                    backgroundColor: color,
                  }}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
