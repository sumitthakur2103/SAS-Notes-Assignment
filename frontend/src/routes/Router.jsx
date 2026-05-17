import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import Notes from '../pages/Notes';
import NoteEditor from '../pages/NoteEditor';
import PublicNote from '../pages/PublicNote';
import useAuth from '../store/useAuth';

const Protected = ({ children }) => {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" />;
  return children;
};

export default function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Protected><Dashboard /></Protected>} />
      <Route path="/notes" element={<Protected><Notes /></Protected>} />
      <Route path="/notes/:id" element={<Protected><NoteEditor /></Protected>} />
      <Route path="/public/:publicId" element={<PublicNote />} />
    </Routes>
  );
}
