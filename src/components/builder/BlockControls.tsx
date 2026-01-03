"use client";

import React from "react";

type Props = { onDelete?: () => void; onEdit?: () => void };

export default function BlockControls({ onDelete, onEdit }: Props) {
  return (
    <div className="flex gap-2">
      <button className="gds-btn" onClick={onEdit}>
        Edit
      </button>
      <button className="gds-btn gds-btn-danger" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
}
