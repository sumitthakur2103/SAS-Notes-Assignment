import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NoteCard({ note }){
  return (
    <motion.article whileHover={{ scale: 1.02 }} className="p-4 rounded-xl card soft-shadow border border-white/6">
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-lg">{note.title || 'Untitled'}</h3>
        {note.isPinned && <span className="text-yellow-300 text-xs font-semibold">PIN</span>}
      </div>
      <p className="mt-3 text-sm text-slate-300 line-clamp-3">{note.content || '—'}</p>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-xs text-slate-400">{new Date(note.updatedAt).toLocaleString()}</div>
        <Link to={`/notes/${note._id}`} className="text-indigo-300 text-sm font-medium">Open →</Link>
      </div>
    </motion.article>
  );
}
