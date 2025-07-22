import React, { useState } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { create } from "zustand";

// Zustand store for expanded/collapsed state
const useTreeStore = create((set) => ({
  expanded: {},
  toggle: (id) => set((state) => ({
    expanded: { ...state.expanded, [id]: !state.expanded[id] },
  })),
}));

// Example tree data
const treeData = [
  {
    id: "src",
    name: "src",
    children: [
      { id: "scanner.py", name: "scanner.py" },
      { id: "rule_engine.py", name: "rule_engine.py" },
      { id: "refactorer.py", name: "refactorer.py" },
      { id: "history.py", name: "history.py" },
    ],
  },
  {
    id: "tests",
    name: "tests",
    children: [
      { id: "test_scanner.py", name: "test_scanner.py" },
      { id: "test_rule_engine.py", name: "test_rule_engine.py" },
    ],
  },
];

function TreeNode({ node }) {
  const { expanded, toggle } = useTreeStore();
  const hasChildren = node.children && node.children.length > 0;
  const [search, setSearch] = useState("");

  // Filter children by search
  const filteredChildren = hasChildren
    ? node.children.filter((child) => child.name.toLowerCase().includes(search.toLowerCase()))
    : [];

  return (
    <div className="ml-2">
      <div className="flex items-center gap-1">
        {hasChildren && (
          <button
            className="text-xs px-1"
            onClick={() => toggle(node.id)}
            aria-label={expanded[node.id] ? "Collapse" : "Expand"}
          >
            <ChevronDownIcon className={expanded[node.id] ? "rotate-0" : "-rotate-90"} />
          </button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span className="cursor-pointer hover:underline text-sm font-medium">
              {node.name}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => alert(`Open ${node.name}`)}>Open</DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert(`Rename ${node.name}`)}>Rename</DropdownMenuItem>
            <DropdownMenuItem onClick={() => alert(`Delete ${node.name}`)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {hasChildren && expanded[node.id] && (
        <div className="ml-4">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-1 px-2 py-1 text-xs border rounded w-32"
          />
          {filteredChildren.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SidebarTree() {
  return (
    <aside className="w-64 bg-white border-r p-4 h-full overflow-y-auto">
      <h2 className="text-lg font-bold mb-2">Project Files</h2>
      {treeData.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </aside>
  );
}
