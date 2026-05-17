import React from 'react';
import { Link } from 'react-router-dom';
import { Home, FileText, Archive, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Sidebar(){
  return (
    <aside className="w-64 hidden md:flex flex-col gap-4 p-4">
      <div className="card p-4">
        <h3 className="text-sm font-semibold">Workspace</h3>
        <nav className="mt-3 flex flex-col gap-2">
          <Link to="/" className="flex items-center gap-3 p-2 rounded hover:bg-white/5 transition"><Home size={16} /> Dashboard</Link>
          <Link to="/notes" className="flex items-center gap-3 p-2 rounded hover:bg-white/5 transition"><FileText size={16} /> Notes</Link>
          <Link to="#" className="flex items-center gap-3 p-2 rounded hover:bg-white/5 transition"><Archive size={16} /> Archived</Link>
          <Link to="#" className="flex items-center gap-3 p-2 rounded hover:bg-white/5 transition"><Share2 size={16} /> Shared</Link>
        </nav>
      </div>
      <div className="mt-auto card p-4 text-sm text-slate-300">Pro tip: Use AI to summarize notes quickly.</div>
    </aside>
  );
}
