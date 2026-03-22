'use client';
import { ChefHat, Tag } from 'lucide-react';
import Link from 'next/link';

export default function Navbar({ restaurant, hasPromos }) {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center p-4 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <Link href="/" className="flex items-center gap-2 cursor-pointer text-gray-900">
        <ChefHat className="text-primary" size={24} />
        <h1 className="font-bold text-xl m-0">{restaurant?.name || 'Digital Menu'}</h1>
      </Link>
      {hasPromos && (
        <Link href="/promos" className="flex items-center gap-1.5 bg-accent hover:bg-accent-hover text-white py-2 px-4 rounded-full font-semibold text-sm shadow-md transition-colors">
          <Tag size={16} />
          <span>Offers</span>
        </Link>
      )}
    </nav>
  );
}
