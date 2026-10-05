"use client";
import React, { useState, useEffect } from 'react';
import { db } from '../../../lib/firebase';
import { ref, push, set, onValue, query, orderByChild, limitToLast } from 'firebase/database';

export default function AdminPaymentPage() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [clientName, setClientName] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    // Listen to recent payments
    const paymentsRef = query(ref(db, 'payment_links'), limitToLast(20));
    const unsubscribe = onValue(paymentsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const paymentsList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).sort((a, b) => b.createdAt - a.createdAt);
        setPayments(paymentsList);
      } else {
        setPayments([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGenerateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return alert('Invalid amount');
    
    setLoading(true);
    try {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      let randomStr = '';
      for (let i = 0; i < 6; i++) {
        randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      const paymentId = 'RF-' + randomStr;
      
      const paymentData = {
        amount: Number(amount),
        description: description || 'Service Payment',
        clientName: clientName || 'Client',
        status: 'pending',
        createdAt: Date.now(),
      };
      
      await set(ref(db, `payment_links/${paymentId}`), paymentData);
      
      const link = `${window.location.origin}/payment/${paymentId}`;
      setGeneratedLink(link);
      setAmount('');
      setDescription('');
      setClientName('');
    } catch (error) {
      console.error(error);
      alert('Error generating link');
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white mb-2">Payment Hub</h1>
        <p className="text-slate-400">Generate secure payment links for your clients.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Generate Link Form */}
        <div className="lg:col-span-1 bg-white/5 border border-white/10 p-6 rounded-3xl space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <i className="fas fa-link text-electric"></i> Create Payment Link
          </h2>
          
          <form onSubmit={handleGenerateLink} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Client Name</label>
              <input 
                type="text" 
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-electric outline-none transition-colors"
                placeholder="e.g. John Doe"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Service Description</label>
              <input 
                type="text" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-electric outline-none transition-colors"
                placeholder="e.g. Website Development"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Amount (BDT)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">৳</span>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white focus:border-electric outline-none transition-colors font-bold"
                  placeholder="5000"
                  required
                  min="1"
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-electric hover:bg-neon text-white font-black rounded-xl transition-colors disabled:opacity-50"
            >
              {loading ? 'Generating...' : 'Generate Link'}
            </button>
          </form>

          {generatedLink && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-3">
              <p className="text-emerald-400 text-sm font-bold flex items-center gap-2">
                <i className="fas fa-check-circle"></i> Link Generated Successfully!
              </p>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  readOnly 
                  value={generatedLink} 
                  className="flex-1 bg-black/30 border border-emerald-500/20 rounded-lg px-3 py-2 text-sm text-emerald-100 outline-none"
                />
                <button onClick={copyToClipboard} className="px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-bold transition-colors">
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Recent Links / Payments */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 p-6 rounded-3xl">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
            <i className="fas fa-history text-neon"></i> Recent Payments
          </h2>
          
          <div className="space-y-4">
            {payments.length === 0 ? (
              <p className="text-slate-500 text-center py-8">No payment links generated yet.</p>
            ) : (
              payments.map((pay) => (
                <div key={pay.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-black/20 border border-white/5 rounded-2xl gap-4">
                  <div>
                    <h3 className="font-bold text-white text-lg">{pay.clientName}</h3>
                    <p className="text-sm text-slate-400">{pay.description}</p>
                    <p className="text-xs text-slate-500 mt-1">{new Date(pay.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-slate-400">Amount</p>
                      <p className="font-black text-xl text-white">৳{pay.amount}</p>
                    </div>
                    <div>
                      {pay.status === 'completed' ? (
                        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                          <i className="fas fa-check"></i> Paid
                        </span>
                      ) : pay.status === 'processing' ? (
                        <span className="px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                          <i className="fas fa-spinner fa-spin"></i> Processing
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-slate-500/20 text-slate-400 border border-slate-500/30 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                          <i className="fas fa-clock"></i> Pending
                        </span>
                      )}
                    </div>
                    {pay.status === 'processing' && pay.trxId && (
                       <div className="text-right">
                         <p className="text-xs text-slate-400">TrxID: <span className="text-white font-mono">{pay.trxId}</span></p>
                         <p className="text-xs text-slate-400">From: <span className="text-white">{pay.senderNumber}</span></p>
                         <button 
                            onClick={() => {
                              // Verify Payment Logic
                              if(confirm(`Mark payment of ৳${pay.amount} from ${pay.clientName} as completed?`)) {
                                import('firebase/database').then(({ref, update}) => {
                                  update(ref(db, `payment_links/${pay.id}`), { status: 'completed' });
                                })
                              }
                            }}
                            className="mt-2 text-xs bg-emerald-600 px-2 py-1 rounded text-white"
                         >
                           Verify & Accept
                         </button>
                       </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

