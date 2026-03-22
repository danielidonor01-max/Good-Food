'use client';
import { useEffect, useRef } from 'react';
import { useMenu } from '../context/MenuContext';
import MenuItem from './MenuItem';

export default function MenuGrid({ categories, items, currency }) {
  const { setActiveCategory } = useMenu();
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id.replace('category-', ''));
          }
        });
      },
      { rootMargin: '-150px 0px -60% 0px', threshold: 0 }
    );

    const elements = document.querySelectorAll('.category-section');
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [categories, setActiveCategory]);

  return (
    <div className="pt-2 pb-12">
      {categories?.map(category => {
        const categoryItems = items?.filter(item => item.categoryId === category.id) || [];
        if (categoryItems.length === 0) return null;

        return (
          <div key={category.id} id={`category-${category.id}`} className="category-section mb-10 pt-4">
            <h2 className="px-6 font-bold text-xl text-gray-900 mb-4">{category.name}</h2>
            <div className="px-6 flex flex-col gap-4">
              {categoryItems.map(item => (
                <MenuItem key={item.id} item={item} currency={currency} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
