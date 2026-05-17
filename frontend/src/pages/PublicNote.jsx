import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPublic } from '../services/noteService';

export default function PublicNote(){
  const { publicId } = useParams();
  const [note, setNote] = useState(null);
  useEffect(()=>{ (async()=>{ try{ const { data } = await getPublic(publicId); setNote(data.data); }catch(e){ console.error(e); } })(); }, [publicId]);
  if (!note) return <div className="min-h-screen p-6">Loading...</div>;
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-800 text-white">
      <div className="max-w-3xl mx-auto bg-white/5 p-6 rounded-xl backdrop-blur-md">
        <h1 className="text-2xl font-bold">{note.title}</h1>
        <p className="mt-4 whitespace-pre-wrap">{note.content}</p>
        <div className="mt-4 text-sm text-slate-300">Tags: {note.tags?.join(', ')}</div>
      </div>
    </div>
  );
}
