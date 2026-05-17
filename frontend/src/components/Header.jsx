import React from 'react';
import useAuth from '../store/useAuth';
import { Link } from 'react-router-dom';
import { MotionConfig, motion } from 'framer-motion';
import { LogOut, Plus } from 'lucide-react';

export default function Header(){
  const logout = useAuth((s)=>s.logout);
  return (
    <MotionConfig transition={{ duration: 0.18 }}>
      <header className="w-full flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">AN</div>
          <h1 className="text-xl font-semibold">AI Notes</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/notes" className="btn-ghost">Notes</Link>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} onClick={logout} className="inline-flex items-center gap-2 btn-ghost">
            <LogOut size={16} /> <span>Logout</span>
          </motion.button>
        </div>
      </header>
    </MotionConfig>
  );
}
