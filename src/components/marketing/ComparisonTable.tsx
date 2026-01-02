import React from 'react'

export default function ComparisonTable({ columns, rows }: { columns: string[]; rows: any[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c} className="text-left p-3 border-b">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="odd:bg-white even:bg-slate-50">
              {columns.map((c) => (
                <td key={c} className="p-3 align-top text-sm text-slate-700">{r[c] ?? '-'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
