import React from 'react';
import useAuth from '../store/useAuth';
import { Link } from 'react-router-dom';

export default function Header(){
  const logout = useAuth((s)=>s.logout);
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">AI Notes</h1>
      <div className="flex items-center gap-4">
        <Link to="/notes" className="text-slate-200 hover:text-white">Notes</Link>
        <button onClick={logout} className="bg-red-600 px-3 py-1 rounded">Logout</button>
      </div>
    </header>
  );
}
