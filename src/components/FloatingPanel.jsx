'use client';
import { useState } from 'react';
import { useMenu } from '../context/MenuContext';
import { ShoppingBag, MessageCircle, BellRing, X, CheckCircle2 } from 'lucide-react';

export default function FloatingPanel({ currency = '₦', items = [] }) {
  const { cart, totalItems, hasInteracted, clearCart } = useMenu();
  const [showWaiterModal, setShowWaiterModal] = useState(false);

  if (!hasInteracted) return null;

  const selectedItems = Object.entries(cart)
    .map(([id, quantity]) => {
      const item = items.find((i) => i.id === id);
      return item ? { ...item, quantity } : null;
    })
    .filter(Boolean);

  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleWhatsApp = () => {
    if (selectedItems.length === 0) return;
    const orderText = selectedItems.map(i => `${i.quantity}x ${i.name}`).join('%0A');
    const message = encodeURIComponent(`Hello! I'd like to place an order:%0A%0A${decodeURIComponent(orderText)}%0A%0ATotal: ${currency}${totalPrice.toLocaleString()}`);
    // Using the user-specified WhatsApp Number
    window.open(`https://wa.me/2348060076429?text=${message}`);
  };

  return (
    <>
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-[480px] bg-white rounded-3xl p-4 z-[100] shadow-[0_12px_40px_rgba(0,0,0,0.15)] border border-gray-100 transition-transform duration-300 ${totalItems > 0 && !showWaiterModal ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0 pointer-events-none'}`}>
        
        <div className="flex justify-between items-center mb-4 px-2">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full text-primary">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                {totalItems}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Your Order</p>
              <p className="font-bold text-base text-gray-900">{totalItems} Item{totalItems !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <div className="text-right flex flex-col justify-center">
            <p className="font-bold text-lg text-primary">{currency}{totalPrice.toLocaleString()}</p>
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Subtotal</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={handleWhatsApp}
            className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white py-3 px-4 rounded-xl font-bold text-sm transition-colors active:scale-[0.98]"
          >
            <MessageCircle size={18} fill="currentColor" /> Send Order
          </button>

          <button 
            onClick={() => setShowWaiterModal(true)}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200 py-3 px-4 rounded-xl font-bold text-sm transition-colors active:scale-[0.98]"
          >
            <BellRing size={18} /> Show Waiter
          </button>
        </div>
      </div>

      {/* Embedded Waiter Modal */}
      {showWaiterModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[200] flex flex-col justify-end transition-opacity">
          <div className="bg-white w-full rounded-t-[32px] p-6 pb-10 flex flex-col max-h-[85vh] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transform transition-transform">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="font-bold text-2xl text-gray-900 mb-1">Order Summary</h2>
                <p className="text-sm text-gray-500">Please verify selections with your waiter.</p>
              </div>
              <button 
                onClick={() => setShowWaiterModal(false)}
                className="bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 border-none w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors active:scale-90 shrink-0"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 pr-2 -mr-2 mb-6">
              <ul className="flex flex-col gap-3">
                {selectedItems.map((item) => (
                  <li key={item.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 shrink-0 rounded-full bg-white text-primary font-bold flex items-center justify-center border border-gray-200 shadow-sm text-sm">
                        {item.quantity}x
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 leading-tight text-sm">{item.name}</p>
                        {item.tags && item.tags.length > 0 && (
                          <p className="text-[11px] font-semibold text-accent mt-0.5">{item.tags[0]}</p>
                        )}
                      </div>
                    </div>
                    <span className="font-bold text-gray-900 whitespace-nowrap pl-4">{currency}{(item.price * item.quantity).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto pt-4 border-t border-gray-200">
              <div className="flex justify-between items-end mb-6 px-1">
                <span className="text-gray-500 font-bold uppercase tracking-wider text-xs">Total Amount</span>
                <span className="font-bold text-3xl text-primary leading-none">{currency}{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    clearCart();
                    setShowWaiterModal(false);
                  }}
                  className="flex items-center justify-center px-6 py-4 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-2xl transition-colors active:scale-[0.98]"
                >
                  Clear
                </button>
                <button 
                  onClick={() => setShowWaiterModal(false)}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-primary/30 transition-colors active:scale-[0.98]"
                >
                  <CheckCircle2 size={20} /> Close Summary
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
