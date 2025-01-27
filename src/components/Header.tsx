import React from 'react';
import { Gift, Heart } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-3">
          <Heart className="w-8 h-8 text-sky-500" />
          <Gift className="w-8 h-8 text-sky-500" />
          <h1 className="text-3xl font-semibold text-center text-gray-900">
           Lista de Presentes Larissa & Guilherme
          </h1>
          <Gift className="w-8 h-8 text-sky-500" />
          <Heart className="w-8 h-8 text-sky-500" />
        </div>
      </div>
    </header>
  );
}