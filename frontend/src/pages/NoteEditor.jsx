import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNote, updateNote, deleteNote, aiSummary, aiTitle, aiActions, generateShare } from '../services/noteService';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

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

  if (!note) return <Layout><div className="p-8 card">Loading...</div></Layout>;

  return (
    <Layout>
      <motion.div initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} className="max-w-3xl">
        <input value={note.title} onChange={(e)=>setNote({...note, title: e.target.value})} className="input text-2xl font-semibold" />
        <textarea value={note.content} onChange={(e)=>setNote({...note, content: e.target.value})} rows={14} className="input mt-3 min-h-[320px]" />
        <div className="mt-4 flex gap-2 flex-wrap">
          <button onClick={save} className="btn-primary">{saving?'Saving...':'Save'}</button>
          <button onClick={suggestTitle} className="btn-primary bg-purple-600">Suggest title</button>
          <button onClick={makeSummary} className="btn-ghost">AI Summary</button>
          <button onClick={actions} className="btn-ghost">Extract actions</button>
          <button onClick={share} className="btn-ghost">Share</button>
          <button onClick={remove} className="btn-ghost text-red-400">Delete</button>
        </div>
      </motion.div>
    </Layout>
  );
}
