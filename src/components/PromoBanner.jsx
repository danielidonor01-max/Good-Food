'use client';
import { useState, useEffect } from 'react';

export default function PromoBanner({ promos }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!promos || promos.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [promos]);

  if (!promos || promos.length === 0) return null;

  const currentPromo = promos[currentIndex];

  return (
    <div className="relative mx-6 my-6 h-[200px] rounded-2xl overflow-hidden shadow-sm border border-gray-200">
      <div className="w-full h-full relative bg-gray-200">
        {currentPromo.image ? (
          <img src={currentPromo.image} alt={currentPromo.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>

      {currentPromo.tag && (
        <span className="absolute top-4 right-4 bg-accent text-white text-[12px] font-bold px-2 py-1 rounded-md uppercase tracking-wide">
          {currentPromo.tag}
        </span>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h2 className="font-bold text-xl text-white mb-2 shadow-sm">{currentPromo.title}</h2>
        <p className="text-sm text-white/90 truncate max-w-[90%]">{currentPromo.description}</p>
      </div>

      {promos.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md">
          {promos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${idx === currentIndex ? 'bg-accent w-6' : 'bg-white/60 w-1.5 hover:bg-white'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
