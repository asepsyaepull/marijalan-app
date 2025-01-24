'use client';

import { Button } from '@/components/ui/button';
import PromoCard from '../card/promoCard';
import usePromo from '@/hooks/usePromo';

export default function ExclusiveDeals() {
    const { data: promos, isLoading, error } = usePromo();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className="py-10 px-4 md:px-8 lg:px-12">
            <div className="max-w-7xl px-4 mx-auto">
                <div className="space-y-8">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                            Exclusive deals just for you!
                        </h2>
                        <Button variant="ghost" className="text-orange-500">
                            View More →
                        </Button>
                    </div>

                    {/* Promo Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {promos.slice(0, 3).map((promo) => (
                            <PromoCard key={promo.id} promo={promo} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}