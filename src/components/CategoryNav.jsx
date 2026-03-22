'use client';
import { useMenu } from '../context/MenuContext';
import * as Icons from 'lucide-react';

export default function CategoryNav({ categories }) {
  const { activeCategory, setActiveCategory } = useMenu();

  const scrollToCategory = (categoryId) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      const yOffset = -140; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-[73px] z-40 bg-gradient-to-b from-bg-main via-bg-main to-transparent py-4">
      <div className="flex overflow-x-auto gap-4 px-6 pb-2 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {categories?.map((cat) => {
          const Icon = Icons[cat.icon] || Icons.Utensils;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              className={`flex flex-col items-center justify-center min-w-[80px] p-4 rounded-2xl border transition-all shrink-0 ${
                isActive
                  ? 'bg-primary/10 border-primary text-primary shadow-sm'
                  : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
            >
              <div className={`mb-2 transition-transform ${isActive ? '-translate-y-0.5' : ''}`}>
                <Icon size={24} />
              </div>
              <span className="text-[12px] font-semibold whitespace-nowrap">{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
