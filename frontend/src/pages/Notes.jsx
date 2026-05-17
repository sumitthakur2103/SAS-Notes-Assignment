import React, { useEffect, useState } from 'react';
import { getNotes, createNote } from '../services/noteService';
import useNotes from '../store/useNotes';
import Layout from '../components/Layout';
import NoteCard from '../components/NoteCard';

export default function Notes(){
  const { notes, setNotes } = useNotes();
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try{
      const { data } = await getNotes();
      setNotes(data.data);
    }catch(e){ console.error(e) }
    setLoading(false);
  };

  useEffect(()=>{ load(); }, []);

  const add = async () => {
    const { data } = await createNote({ title: 'New note', content: '' });
    setNotes([data.data, ...notes]);
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Your Notes</h2>
        <button onClick={add} className="btn-primary">New note</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading && Array.from({length:6}).map((_,i)=>(<div key={i} className="p-4 card skeleton" style={{height:120}}/>))}
        {!loading && notes.length===0 && <div className="text-slate-300 p-8 card">No notes yet — create one to see it here.</div>}
        {notes.map(n=> <NoteCard key={n._id} note={n} />)}
      </div>
    </Layout>
  );
}
