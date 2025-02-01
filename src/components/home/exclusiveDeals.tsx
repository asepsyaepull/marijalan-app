'use client';

import { Button } from '@/components/ui/button';
import PromoCard from '../card/promoCard';
import usePromo from '@/hooks/usePromo';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { PromoItem } from '@/components/card/promoCard'; 
import PromoDetailDialog from '@/components/dialog/PromoDetailDialog'; 
import { Skeleton } from '@/components/ui/skeleton';

export default function ExclusiveDeals() {
    const router = useRouter();
    const { data: promos, isLoading, error } = usePromo();
    const [selectedPromo, setSelectedPromo] = useState<PromoItem | null>(null);

    if (isLoading) {
        return (
            <section className="py-10 px-4 md:px-8 lg:px-12">
                <div className="max-w-7xl px-4 mx-auto">
                    <Skeleton className="w-full h-64" />
                </div>
            </section>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className="py-8 md:py-10 px-4 md:px-8 lg:px-12">
            <div className="max-w-7xl px-4 mx-auto">
                <div className="space-y-8">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                            Exclusive deals just for you!
                        </h2>
                    </div>

                    {/* Promo Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {promos.slice(0, 3).map((promo) => (
                            <PromoCard 
                                key={promo.id} 
                                promo={promo} 
                                onClick={() => setSelectedPromo(promo)} // Set selected promo on click
                            />
                        ))}
                    </div>
                    <PromoDetailDialog promo={selectedPromo} onClose={() => setSelectedPromo(null)} open={!!selectedPromo} />
                    <div className="flex justify-center items-center">
                        <Button
                            variant="default"
                            className="rounded-lg w-40 md:w-52 bg-orange-50 text-orange-500 hover:bg-orange-500 hover:text-white"
                            onClick={() => router.push('/promos')}
                        >
                            Explore More →
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}