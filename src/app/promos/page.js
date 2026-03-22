import Navbar from '../../components/Navbar';
import { getPromos, getRestaurant } from '../../sanity/queries';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function PromosPage() {
  const [promos, restaurant] = await Promise.all([
    getPromos(),
    getRestaurant()
  ]);

  return (
    <main className="min-h-screen bg-bg-main pb-12">
      <Navbar restaurant={restaurant} hasPromos={false} />
      
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/" className="p-2 -ml-2 text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h2 className="font-bold text-2xl text-gray-900 m-0">Special Offers</h2>
        </div>

        {promos?.length > 0 ? (
          <div className="flex flex-col gap-6">
            {promos.map(promo => (
              <div key={promo.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                <div className="w-full h-[200px] relative bg-gray-200">
                  {promo.image ? (
                    <img src={promo.image} alt={promo.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                  {promo.tag && (
                    <span className="absolute top-4 right-4 bg-accent text-white text-[12px] font-bold px-2 py-1 rounded-md uppercase tracking-wide">
                      {promo.tag}
                    </span>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{promo.title}</h3>
                  <p className="text-base text-gray-500 mb-6">{promo.description}</p>
                  
                  {promo.trigger_type !== 'time_delay' && (
                    <button className="w-full bg-accent hover:bg-accent-hover text-white font-semibold py-3 px-6 rounded-xl transition-colors">
                      {promo.CTA_text || 'Redeem Offer'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No active promotions at this time.
          </div>
        )}
      </div>
    </main>
  );
}
