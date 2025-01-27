import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { Header } from '../components/Header';
import { GiftList } from '../components/GiftList';
import GeneralRules from '../components/GeneralRules';
import { Gift } from '../types';

export function HomePage() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [showBuyerForm, setShowBuyerForm] = useState(false);

  useEffect(() => {
    fetchGifts();
  }, []);

  async function fetchGifts() {
    const { data, error } = await supabase
      .from('gifts')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      toast.error('Error loading gifts');
      return;
    }

    setGifts(data || []);
  }

  async function handlePurchase(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedGift) return;

    const { error } = await supabase
      .from('gifts')
      .update({
        is_purchased: true,
        buyer_name: buyerName,
        buyer_phone: buyerPhone,
      })
      .eq('id', selectedGift.id);

    if (error) {
      toast.error('Error marking gift as purchased');
      return;
    }

    toast.success('Thank you for your gift!');
    setShowBuyerForm(false);
    setBuyerName('');
    setBuyerPhone('');
    setSelectedGift(null);
    fetchGifts();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-sky-100">
      <Header />
      
      

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      
      <GeneralRules/>

        <GiftList
          gifts={gifts}
          onSelectGift={(gift) => {
            setSelectedGift(gift);
            setShowBuyerForm(true);
          }}
        />

        {/* Buyer Form Modal */}
        {showBuyerForm && selectedGift && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-2xl font-semibold mb-4">Presentear o casal</h2>
              <p className="mb-4">
                Você selecionou: <strong>{selectedGift.name}</strong>
              </p>
              <form onSubmit={handlePurchase}>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Seu telefone"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowBuyerForm(false);
                      setSelectedGift(null);
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
                  >
                    Confirmar Presente
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}