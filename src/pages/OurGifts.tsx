import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';
import { Header } from '../components/Header';
import { Gift } from '../types';

export function OurGifts() {
  const [purchasedGifts, setPurchasedGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPurchasedGifts();
  }, []);

  async function fetchPurchasedGifts() {
    setLoading(true);

    const { data, error } = await supabase
      .from('gifts')
      .select('*')
      .eq('is_purchased', true)
      .order('created_at', { ascending: true });

    if (error) {
      toast.error('Erro ao carregar os presentes recebidos');
      setLoading(false);
      return;
    }

    setPurchasedGifts(data || []);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-sky-100">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Presentes Recebidos</h1>

        {loading ? (
          <p className="text-center text-gray-600">Carregando presentes...</p>
        ) : purchasedGifts.length === 0 ? (
          <p className="text-center text-gray-600">Nenhum presente recebido ainda.</p>
        ) : (
          <div className="bg-white rounded-lg shadow p-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 border">Presente</th>
                  <th className="p-3 border">Doador</th>
                  <th className="p-3 border">Telefone</th>
                  <th className="p-3 border">Mensagem</th>
                </tr>
              </thead>
              <tbody>
                {purchasedGifts.map((gift) => (
                  <tr key={gift.id} className="hover:bg-gray-100">
                    <td className="p-3 border">{gift.name}</td>
                    <td className="p-3 border">{gift.buyer_name}</td>
                    <td className="p-3 border">{gift.buyer_phone}</td>
                    <td className="p-3 border">
                      {gift.buyer_message || <span className="text-gray-500">Sem mensagem</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default OurGifts;
