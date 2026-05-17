import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNote, updateNote, deleteNote, aiSummary, aiTitle, aiActions, generateShare } from '../services/noteService';
import Header from '../components/Header';

export default function NoteEditor(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [saving,setSaving]=useState(false);

  useEffect(()=>{ if (id) load(); }, [id]);
  const load = async ()=>{ const { data } = await getNote(id); setNote(data.data); };

  const save = async ()=>{ setSaving(true); await updateNote(id, note); setSaving(false); alert('Saved'); };
  const remove = async ()=>{ if (!confirm('Delete note?')) return; await deleteNote(id); navigate('/notes'); };
  const makeSummary = async ()=>{ const { data } = await aiSummary({ title: note.title, content: note.content }); alert(data.data.summary); };
  const suggestTitle = async ()=>{ const { data } = await aiTitle({ content: note.content }); setNote({...note, title: data.data.title}); };
  const actions = async ()=>{ const { data } = await aiActions({ content: note.content }); alert(JSON.stringify(data.data.actions)); };
  const share = async ()=>{ const { data } = await generateShare(id); prompt('Share URL', window.location.origin + data.data.url); };

  if (!note) return <div className="min-h-screen bg-slate-900 text-white p-6"><Header/>Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <Header />
      <div className="mt-6 max-w-3xl">
        <input value={note.title} onChange={(e)=>setNote({...note, title: e.target.value})} className="w-full p-3 rounded-md text-2xl bg-white/5" />
        <textarea value={note.content} onChange={(e)=>setNote({...note, content: e.target.value})} rows={12} className="w-full p-3 mt-3 rounded-md bg-white/5" />
        <div className="mt-3 flex gap-2">
          <button onClick={save} className="bg-indigo-600 px-3 py-2 rounded">{saving?'Saving...':'Save'}</button>
          <button onClick={suggestTitle} className="bg-purple-600 px-3 py-2 rounded">Suggest title</button>
          <button onClick={makeSummary} className="bg-slate-600 px-3 py-2 rounded">AI Summary</button>
          <button onClick={actions} className="bg-emerald-600 px-3 py-2 rounded">Extract actions</button>
          <button onClick={share} className="bg-yellow-500 px-3 py-2 rounded">Share</button>
          <button onClick={remove} className="bg-red-600 px-3 py-2 rounded">Delete</button>
        </div>
      </div>
    </div>
  );
}
