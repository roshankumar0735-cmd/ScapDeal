// frontend/src/admin/StatusBadge.jsx
import React from "react";

export default function StatusBadge({ status }) {
  const map = {
    pending: "bg-yellow-100 text-yellow-800",
    assigned: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <span className={`px-2 py-1 rounded text-xs ${map[status] || ""}`}>
      {status}
    </span>
  );
}
