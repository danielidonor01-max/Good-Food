'use client';
import { useState } from 'react';
import { useMenu } from '../context/MenuContext';
import { Plus, Check, Star, X } from 'lucide-react';

export default function FeaturedCombos({ combos, currency }) {
  const { getQuantity, updateQuantity } = useMenu();
  const [selectedCombo, setSelectedCombo] = useState(null);

  if (!combos || combos.length === 0) return null;

  return (
    <div className="mb-8 pt-4">
      <div className="px-6 flex items-center gap-2 mb-4">
        <Star className="text-accent fill-accent" size={20} />
        <h2 className="font-bold text-xl text-gray-900 m-0">Featured Combos</h2>
      </div>
      
      <div className="flex overflow-x-auto gap-4 px-6 pb-2 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {combos.map((combo) => (
          <button 
            key={combo.id} 
            onClick={() => setSelectedCombo(combo)}
            className="text-left min-w-[260px] w-[75vw] max-w-[320px] bg-white rounded-3xl overflow-hidden shadow-sm shadow-gray-200/50 border border-gray-100 flex-shrink-0 relative transition-transform active:scale-[0.98]"
          >
            <div className="h-[220px] w-full relative bg-gray-100">
              {combo.image ? (
                <img src={combo.image} alt={combo.title} loading="lazy" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-orange-100" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent"></div>
              <div className="absolute top-4 left-4 bg-accent text-white text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-sm">
                Featured Combo
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-bold text-xl text-white leading-tight mb-1">{combo.title}</h3>
                <div className="text-accent font-bold text-lg">{currency}{combo.price?.toLocaleString() || 'N/A'}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedCombo && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[200] flex flex-col justify-end transition-opacity">
          <div className="bg-white w-full rounded-t-[32px] p-6 pb-10 flex flex-col max-h-[90vh] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transform transition-transform animate-in slide-in-from-bottom duration-300">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 shrink-0"></div>
            
            <div className="flex justify-between items-start mb-6 shrink-0">
              <div>
                <div className="bg-accent/10 text-accent text-xs font-bold px-2 py-1 rounded inline-block uppercase tracking-wider mb-2">
                  Featured Combo
                </div>
                <h2 className="font-bold text-2xl text-gray-900 mb-1 leading-tight pr-4">{selectedCombo.title}</h2>
                <div className="font-bold text-xl text-primary">{currency}{selectedCombo.price?.toLocaleString()}</div>
              </div>
              <button 
                onClick={() => setSelectedCombo(null)}
                className="bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 border-none w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors active:scale-90 shrink-0"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 pr-2 -mr-2 mb-4">
              <div className="w-full h-[180px] rounded-2xl overflow-hidden mb-6 bg-gray-100">
                {selectedCombo.image ? (
                   <img src={selectedCombo.image} alt={selectedCombo.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-orange-100" />
                )}
              </div>

              {selectedCombo.description && (
                <p className="text-gray-600 text-[15px] mb-6 leading-relaxed">
                  {selectedCombo.description}
                </p>
              )}

              {selectedCombo.items?.length > 0 && (
                <div className="mb-2 bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <p className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">What's Included</p>
                  <ul className="flex flex-col gap-3.5">
                    {selectedCombo.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-[15px] text-gray-800 font-medium">
                        <div className="mt-[6px] w-[6px] h-[6px] rounded-full bg-primary shrink-0" /> 
                        <div className="flex flex-col leading-snug">
                          <span>{item.name}</span>
                          {item.type && <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">{item.type}</span>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="shrink-0 mt-auto pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  updateQuantity(selectedCombo.id, 1);
                  setSelectedCombo(null);
                }}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg transition-all ${
                  getQuantity(selectedCombo.id) > 0 
                    ? 'bg-primary text-white active:bg-primary-hover shadow-lg shadow-primary/30 active:scale-[0.98]' 
                    : 'bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/30 active:scale-[0.98]'
                }`}
              >
                {getQuantity(selectedCombo.id) > 0 ? (
                  <><Check size={20} /> Add Another Combo</>
                ) : (
                  <><Plus size={20} /> Add to Order</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
