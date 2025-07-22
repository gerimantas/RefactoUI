import React from "react";

// Toolbar actions as per plan
const actions = [
  { label: "Scan", onClick: () => alert("Scan action") },
  { label: "Proposals", onClick: () => alert("Proposals action") },
  { label: "Apply", onClick: () => alert("Apply action") },
  { label: "Run Tests", onClick: () => alert("Run Tests action") },
  { label: "Undo", onClick: () => alert("Undo action") },
  { label: "Update Rules", onClick: () => alert("Update Rules action") },
  { label: "History", onClick: () => alert("History action") },
];

export default function Toolbar() {
  return (
    <nav className="w-full flex gap-2 bg-gray-50 border-b px-6 py-2 mb-4 shadow-sm">
      {actions.map((action) => (
        <button
          key={action.label}
          className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition text-sm font-medium"
          onClick={action.onClick}
        >
          {action.label}
        </button>
      ))}
    </nav>
  );
}
