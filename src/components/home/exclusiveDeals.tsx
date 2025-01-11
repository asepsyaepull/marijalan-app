'use client';

import { Button } from '@/components/ui/button';
import PromoCard, { PromoType } from '../card/promoCard';

const promos: PromoType[] = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2940&auto=format&fit=crop',
        title: 'Winter holiday',
        subtitle: 'Experience the magic of winter destinations',
        discount: 'Early Bird 50% OFF',
        tag: 'Limited Time',
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2940&auto=format&fit=crop',
        title: 'European tours',
        subtitle: 'FLASH SALE!',
        discount: '30% OFF',
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2946&auto=format&fit=crop',
        title: 'Exclusive Member Discount',
        subtitle: 'For Gold & Silver members',
        discount: '+20% OFF',
    },
];

export default function ExclusiveDeals() {
    return (
        <section className="py-16 px-4 md:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="space-y-8">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Exclusive deals just for you!
                        </h2>
                        <Button variant="ghost" className="text-orange-500">
                            View More →
                        </Button>
                    </div>

                    {/* Promo Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {promos.map((promo) => (
                            <PromoCard key={promo.id} promo={promo} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}