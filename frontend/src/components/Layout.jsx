import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ children }){
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full max-w-7xl mx-auto p-6">
        <Header />
        <div className="mt-6 flex gap-6">
          <Sidebar />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
