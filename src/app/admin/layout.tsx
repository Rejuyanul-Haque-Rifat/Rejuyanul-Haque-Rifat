"use client";
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../../lib/firebase';
import Link from 'next/link';

const ADMIN_UID = 'JxJ2utUHsve05zs9Kjhmnb1lipl2';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-electric">Loading Admin...</div>;
  }

  if (!user || user.uid !== ADMIN_UID) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#04091a]">
        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl max-w-md w-full text-center">
          <h1 className="text-2xl font-black text-white mb-2">Admin Access Only</h1>
          <p className="text-slate-400 mb-8 text-sm">Please login with the authorized admin account to continue.</p>
          {user && user.uid !== ADMIN_UID && (
            <p className="text-red-400 text-sm mb-4">Unauthorized UID: {user.uid}</p>
          )}
          <button 
            onClick={handleLogin}
            className="w-full py-4 bg-electric hover:bg-neon text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-3"
          >
            <i className="fab fa-google"></i> Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#04091a] text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-white/5 border-r border-white/10 p-6 flex flex-col">
        <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-electric to-neon mb-10">ADMIN PANEL</h2>
        
        <nav className="flex-1 space-y-2">
          <Link href="/admin/payment" className="flex items-center gap-3 px-4 py-3 bg-electric/20 text-electric rounded-xl font-bold">
            <i className="fas fa-money-bill-wave"></i> Payments
          </Link>
          {/* Add more links later */}
        </nav>
        
        <button 
          onClick={() => auth.signOut()}
          className="mt-auto flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl font-bold transition-colors"
        >
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
