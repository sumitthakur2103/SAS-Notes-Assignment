import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/noteService';
import useAuth from '../store/useAuth';

export default function Login(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const setToken = useAuth((s)=>s.setToken);

  const submit = async (e) => {
    e.preventDefault(); setLoading(true);
    try{
      const { data } = await login({ email, password });
      setToken(data.data.token);
      navigate('/');
    }catch(err){
      alert(err?.response?.data?.message || 'Login failed');
    }finally{setLoading(false)}
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="hidden md:flex flex-col justify-center p-8 rounded-xl card">
          <h2 className="text-3xl font-bold mb-2">AI Notes Workspace</h2>
          <p className="text-slate-300">Smart notes with AI summaries, sharing and fast search. Built for modern workflows.</p>
        </div>
        <form onSubmit={submit} className="bg-white/3 backdrop-blur-md p-8 rounded-xl w-full glass">
          <h2 className="text-2xl font-semibold mb-4 text-white">Welcome back</h2>
          <input className="input mb-3" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input type="password" className="input mb-4" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          <button className="w-full py-3 rounded-md btn-primary" disabled={loading}>{loading? 'Loading...':'Sign in'}</button>
          <p className="mt-3 text-sm text-slate-300">No account? <Link to="/signup" className="text-indigo-300">Create one</Link></p>
        </form>
      </div>
    </div>
  );
}
