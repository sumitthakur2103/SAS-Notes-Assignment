import React, { useEffect, useState } from 'react';
import { getNotes, createNote } from '../services/noteService';
import useNotes from '../store/useNotes';
import Header from '../components/Header';
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
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <Header />
      <div className="mt-6 flex justify-end">
        <button onClick={add} className="bg-indigo-600 px-4 py-2 rounded">New note</button>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading && <div>Loading...</div>}
        {!loading && notes.length===0 && <div className="text-slate-300">No notes yet — create one</div>}
        {notes.map(n=> <NoteCard key={n._id} note={n} />)}
      </div>
    </div>
  );
}
