import React from 'react';
import { Heart } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3">
          <Heart className="w-8 h-8 text-sky-500" />
          <h1 className="text-3xl font-semibold text-gray-900">
            Larissa & Guilherme
          </h1>
        </div>
      </div>
    </header>
  );
}