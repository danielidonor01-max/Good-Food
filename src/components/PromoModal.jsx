'use client';
import { useMenu } from '../context/MenuContext';
import { useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function PromoModal({ promos, settings }) {
  const { isPromoModalOpen, setIsPromoModalOpen } = useMenu();

  useEffect(() => {
    if (!settings?.modal_enabled || isPromoModalOpen) return;

    // Ensure it strictly pops up once per session across standard routing
    const seen = sessionStorage.getItem('hasSeenPromoModal');
    if (seen) return;

    const timer = setTimeout(() => {
      setIsPromoModalOpen(true);
      sessionStorage.setItem('hasSeenPromoModal', 'true');
    }, 60000); // Strict 60s delay

    return () => clearTimeout(timer);
  }, [settings, isPromoModalOpen, setIsPromoModalOpen]);

  if (!isPromoModalOpen || !promos?.length) return null;

  const featuredPromo = promos[0];

  return (
    <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm z-[200] flex items-center justify-center p-6">
      <div className="bg-white rounded-[24px] w-full max-w-[400px] overflow-hidden relative shadow-2xl border border-gray-200">
        <button 
          onClick={() => setIsPromoModalOpen(false)}
          className="absolute top-4 right-4 bg-black/40 text-white border-none w-8 h-8 rounded-full flex items-center justify-center cursor-pointer z-[210] hover:bg-black/60 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="h-[200px] w-full">
          {featuredPromo.image ? (
            <img src={featuredPromo.image} alt={featuredPromo.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-200" />
          )}
        </div>

        <div className="p-8 text-center flex flex-col items-center">
          <Sparkles className="text-accent mb-4" size={32} />
          <h2 className="font-bold text-2xl text-gray-900 mb-2">{featuredPromo.title}</h2>
          <p className="text-gray-500 text-base mb-6 leading-relaxed bg-white">
            {featuredPromo.description}
          </p>

          <Link
            href="/promos"
            onClick={() => setIsPromoModalOpen(false)}
            className="w-full bg-accent text-white py-4 rounded-2xl text-base font-semibold shadow-lg shadow-accent/30 hover:bg-accent-hover transition-colors block"
          >
            {featuredPromo.CTA_text || 'Claim Offer'}
          </Link>
        </div>
      </div>
    </div>
  );
}
