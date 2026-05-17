import React, { useEffect, useState } from 'react';
import { getNotes } from '../services/noteService';
import useNotes from '../store/useNotes';
import Layout from '../components/Layout';
import NoteCard from '../components/NoteCard';

export default function Dashboard(){
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

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading && Array.from({length:6}).map((_,i)=>(<div key={i} className="p-4 card skeleton" style={{height:120}}/>))}
        {!loading && notes.length===0 && <div className="text-slate-300 p-8 card">No notes yet — click New note to start your first note.</div>}
        {notes.map(n=> <NoteCard key={n._1d} note={n} />)}
      </div>
    </Layout>
  );
}
