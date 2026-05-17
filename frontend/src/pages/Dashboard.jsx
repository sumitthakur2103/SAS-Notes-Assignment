import React, { useEffect, useState } from 'react';
import { getNotes } from '../services/noteService';
import useNotes from '../store/useNotes';
import Header from '../components/Header';
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
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <Header />
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading && <div>Loading...</div>}
        {!loading && notes.length===0 && <div className="text-slate-300">No notes yet — create one</div>}
        {notes.map(n=> <NoteCard key={n._id} note={n} />)}
      </div>
    </div>
  );
}
