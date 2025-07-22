import React, { useState, useEffect } from 'react';
// Simple Tailwind button for recent projects
function Button({ children, onClick, variant = 'outline', size = 'sm' }) {
  const base = 'px-2 py-1 rounded text-sm border transition';
  const variants = {
    default: 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600',
    outline: 'bg-white text-blue-700 border-blue-500 hover:bg-blue-50',
  };
  return (
    <button className={`${base} ${variants[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
}
import { Root as TooltipRoot, Trigger as TooltipTrigger, Content as TooltipContent } from '@radix-ui/react-tooltip';

// TitleBar with click-to-copy and recent projects (localStorage)
export default function TitleBar() {
  const [project, setProject] = useState('RefactoUI');
  const [copied, setCopied] = useState(false);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    // Load recent projects from localStorage
    const rec = JSON.parse(localStorage.getItem('recentProjects') || '[]');
    setRecent(rec);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(project);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
    // Add to recent projects
    let rec = JSON.parse(localStorage.getItem('recentProjects') || '[]');
    if (!rec.includes(project)) {
      rec = [project, ...rec].slice(0, 5);
      localStorage.setItem('recentProjects', JSON.stringify(rec));
      setRecent(rec);
    }
  };

  const handleSelect = (p) => {
    setProject(p);
  };

  return (
    <header className="w-full bg-white shadow flex flex-col md:flex-row md:items-center md:justify-between px-6 py-4 border-b mb-6">
      <div className="flex items-center gap-6">
        <TooltipRoot>
          <TooltipTrigger asChild>
            <h1 className="font-extrabold text-2xl text-blue-700 cursor-pointer select-all" onClick={handleCopy}>
              {project}
            </h1>
          </TooltipTrigger>
          <TooltipContent side="bottom" align="center" className="bg-black text-white rounded px-2 py-1 text-xs">
            {copied ? 'Copied!' : 'Click to copy'}
          </TooltipContent>
        </TooltipRoot>
        {recent.length > 0 && (
          <>
            <span className="ml-2 text-sm text-gray-500">Recent:</span>
            <div className="flex gap-1">
              {recent.map((p) => (
                <Button key={p} size="sm" variant={p === project ? 'default' : 'outline'} onClick={() => handleSelect(p)}>
                  {p}
                </Button>
              ))}
            </div>
          </>
        )}
      </div>
    </header>
  );
}
