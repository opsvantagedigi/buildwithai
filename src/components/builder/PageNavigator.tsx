"use client";

import React from "react";

export default function PageNavigator() {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-slate-600">Page: Home</div>
      <div className="flex gap-2">
        <button className="gds-btn">Add page</button>
        <button className="gds-btn">Rename</button>
      </div>
    </div>
  );
}
