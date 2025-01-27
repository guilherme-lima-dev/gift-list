import React from 'react';
import { Gift, ExternalLink } from 'lucide-react';
import { Gift as GiftType } from '../types';

interface GiftListProps {
  gifts: GiftType[];
  onSelectGift: (gift: GiftType) => void;
}

export function GiftList({ gifts, onSelectGift }: GiftListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {gifts
        .filter((gift) => !gift.is_purchased)
        .map((gift) => (
          <div
            key={gift.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={gift.image_url}
              alt={gift.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {gift.name}
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {[gift.link1, gift.link2, gift.link3]
                  .filter(Boolean)
                  .map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-sky-500 hover:text-sky-600"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Loja {index + 1}</span>
                    </a>
                  ))}
              </div>
              <button
                onClick={() => onSelectGift(gift)}
                className="w-full bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Gift className="w-5 h-5" />
                <span>Presentear o casal</span>
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}