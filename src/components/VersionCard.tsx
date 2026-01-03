"use client";

type VersionSnapshot = {
  version: number;
  timestamp: number;
  state: any;
  changelog: string | null;
  releaseNotes: string | null;
};

export function VersionCard({ snapshot }: { snapshot: VersionSnapshot }) {
  return (
    <div className="border border-slate-700 rounded p-4 space-y-2 text-slate-200">
      <div className="flex justify-between">
        <div className="font-semibold">Version {snapshot.version}</div>
        <div className="text-xs text-slate-400">
          {new Date(snapshot.timestamp).toLocaleString()}
        </div>
      </div>

      {snapshot.changelog && (
        <div>
          <div className="text-sm font-medium mb-1">Changelog</div>
          <pre className="text-xs whitespace-pre-wrap bg-slate-900 p-2 rounded border border-slate-800">
            {snapshot.changelog}
          </pre>
        </div>
      )}

      {snapshot.releaseNotes && (
        <div>
          <div className="text-sm font-medium mb-1">Release Notes</div>
          <pre className="text-xs whitespace-pre-wrap bg-slate-900 p-2 rounded border border-slate-800">
            {snapshot.releaseNotes}
          </pre>
        </div>
      )}
    </div>
  );
}
