import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { Header } from '../components/Header';
import { GiftList } from '../components/GiftList';
import { Gift, NewGift } from '../types';
import { useNavigate } from 'react-router-dom';


export function AdminPage() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();
  const [newGift, setNewGift] = useState<NewGift>({
    name: '',
    image_url: '',
    link1: '',
    link2: '',
    link3: '',
  });

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

  async function handleAddGift(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from('gifts').insert([newGift]);

    if (error) {
      console.log(error.message);
      toast.error('Error adding gift');
      return;
    }

    toast.success('Gift added successfully');
    setNewGift({ name: '', image_url: '', link1: '', link2: '', link3: '' });
    setShowAddForm(false);
    fetchGifts();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-sky-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-between mb-6">
          <button
            onClick={() => navigate('/our-gifts')}
            className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
          >
            Ver Presentes Recebidos
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Adicionar Presente</span>
          </button>
        </div>

        <GiftList gifts={gifts} onSelectGift={() => {}} admin={true} />

        {/* Add Gift Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-2xl font-semibold mb-4">Adicionar Presente</h2>
              <form onSubmit={handleAddGift}>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nome do presente"
                    value={newGift.name}
                    onChange={(e) =>
                      setNewGift({ ...newGift, name: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="url"
                    placeholder="URL da imagem"
                    value={newGift.image_url}
                    onChange={(e) =>
                      setNewGift({ ...newGift, image_url: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="url"
                    placeholder="Link da Loja 1"
                    value={newGift.link1}
                    onChange={(e) =>
                      setNewGift({ ...newGift, link1: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="url"
                    placeholder="Link da Loja 2 (opcional)"
                    value={newGift.link2}
                    onChange={(e) =>
                      setNewGift({ ...newGift, link2: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="url"
                    placeholder="Link da Loja 3 (opcional)"
                    value={newGift.link3}
                    onChange={(e) =>
                      setNewGift({ ...newGift, link3: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600"
                  >
                    Adicionar
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