'use client';
import { useMenu } from '../context/MenuContext';
import { Check, Plus, Minus } from 'lucide-react';

export default function MenuItem({ item, currency = '₦' }) {
  const { getQuantity, updateQuantity } = useMenu();
  const quantity = getQuantity(item.id);

  return (
    <div className="flex bg-white rounded-[20px] overflow-hidden shadow-sm shadow-gray-200/50 border border-gray-100 p-2 gap-3 transition-transform active:scale-[0.99]">
      <div className="w-[110px] h-[110px] shrink-0 relative rounded-2xl overflow-hidden bg-orange-50/50">
        {item.image ? (
          <img src={item.image} alt={item.name} loading="lazy" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-orange-100" />
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between py-1 pr-2">
        <div>
          <h3 className="text-base font-bold leading-tight text-gray-900 mb-1">{item.name}</h3>
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-2">{item.description}</p>
        </div>

        <div className="flex justify-between items-end mt-auto">
          <span className="text-base font-bold text-gray-900">{currency}{item.price.toLocaleString()}</span>

          <div className="h-8 flex items-center">
            {quantity > 0 ? (
              <div className="flex items-center gap-1">
                <div className="flex items-center bg-gray-100 rounded-full p-1 text-gray-900 border border-gray-200">
                  <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white hover:text-primary transition-colors">
                    <Minus size={14} />
                  </button>
                  <span className="font-bold text-sm w-5 text-center">{quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 flex items-center justify-center rounded-full bg-primary text-white shadow-sm transition-transform active:scale-90">
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => updateQuantity(item.id, 1)}
                className="flex items-center justify-center w-8 h-8 bg-gray-100 hover:bg-primary hover:text-white text-gray-900 rounded-full transition-colors shadow-sm"
                aria-label="Add item"
              >
                <Plus size={18} strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
