"use client";
import React, { useState, useEffect } from 'react';
import { db } from '../../../lib/firebase';
import { ref, onValue, update } from 'firebase/database';
import { useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import PaymentGateway from '../../../components/payment/PaymentGateway';

export default function PayPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const orderRef = ref(db, `payment_links/${id}`);
    const unsubscribe = onValue(orderRef, (snapshot) => {
      if (snapshot.exists()) {
        setOrder(snapshot.val());
      } else {
        setOrder(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6] text-gray-500"><Loader2 className="animate-spin w-8 h-8" /></div>;
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F3F4F6] text-gray-500">
        <h1 className="text-2xl font-bold mb-2">Invalid Link</h1>
        <p>This payment link does not exist or has expired.</p>
      </div>
    );
  }

  const handleSubmitPayment = async (data: any) => {
    try {
      await update(ref(db, `payment_links/${id}`), {
        status: 'processing',
        method: data.method,
        senderNumber: data.userPhone || data.senderNumber || '',
        trxId: data.trxId,
        submittedAt: Date.now()
      });
      return id as string;
    } catch(err) {
      console.error(err);
      throw new Error('Failed to submit payment details.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] py-8">
      <PaymentGateway
        mode="stepper"
        refId={id as string}
        amount={order.amount}
        appName={order.clientName || 'HELLO KHETLAL'} // Just passing client name to appear in invoice
        appLogo="/favicon.ico"
        onSubmitPayment={handleSubmitPayment}
      />
    </div>
  );
}


