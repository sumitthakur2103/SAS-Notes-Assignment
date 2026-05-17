import React from 'react';
import { Link } from 'react-router-dom';

export default function NoteCard({ note }){
  return (
    <div className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/5">
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-lg">{note.title || 'Untitled'}</h3>
        {note.isPinned && <span className="text-yellow-300">PIN</span>}
      </div>
      <p className="mt-2 text-sm text-slate-300 line-clamp-3">{note.content}</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-xs text-slate-400">{new Date(note.updatedAt).toLocaleString()}</div>
        <Link to={`/notes/${note._id}`} className="text-indigo-300 text-sm">Open</Link>
      </div>
    </div>
  );
}
