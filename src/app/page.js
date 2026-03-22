import Navbar from '../components/Navbar';
import PromoBanner from '../components/PromoBanner';
import FeaturedCombos from '../components/FeaturedCombos';
import CategoryNav from '../components/CategoryNav';
import MenuGrid from '../components/MenuGrid';
import FloatingPanel from '../components/FloatingPanel';
import PromoModal from '../components/PromoModal';

import { getCategories, getMenuItems, getPromos, getCombos, getSettings, getRestaurant } from '../sanity/queries';

export const revalidate = 10; // Tells Vercel to fetch fresh data from Sanity every 10 seconds

export default async function Home() {
  const [categories, items, promos, combos, settings, restaurant] = await Promise.all([
    getCategories(),
    getMenuItems(),
    getPromos(),
    getCombos(),
    getSettings(),
    getRestaurant()
  ]);

  const currency = settings?.currency_symbol || '₦';

  return (
    <main className="pb-28">
      <Navbar restaurant={restaurant} hasPromos={promos?.length > 0} />
      <PromoBanner promos={promos} />
      
      <CategoryNav categories={categories} />
      <MenuGrid categories={categories} items={items} currency={currency} />
      
      <FloatingPanel currency={currency} items={[...items, ...combos]} />
      <PromoModal promos={promos} settings={settings} currency={currency} />
    </main>
  );
}
