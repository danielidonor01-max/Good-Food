'use client';
import { createContext, useContext, useState, useMemo } from 'react';

const MenuContext = createContext(undefined);

export function MenuProvider({ children }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [cart, setCart] = useState({});
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const updateQuantity = (itemId, change) => {
    setCart((prev) => {
      const current = prev[itemId] || 0;
      const next = current + change;
      if (next <= 0) {
        const newCart = { ...prev };
        delete newCart[itemId];
        return newCart;
      }
      return { ...prev, [itemId]: next };
    });
    if (!hasInteracted) setHasInteracted(true);
  };

  const getQuantity = (itemId) => cart[itemId] || 0;
  const clearCart = () => setCart({});

  const totalItems = useMemo(() => {
    return Object.values(cart).reduce((sum, q) => sum + q, 0);
  }, [cart]);

  return (
    <MenuContext.Provider value={{
      activeCategory, setActiveCategory,
      cart, updateQuantity, getQuantity, clearCart, totalItems,
      isPromoModalOpen, setIsPromoModalOpen,
      hasInteracted, setHasInteracted
    }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
}
