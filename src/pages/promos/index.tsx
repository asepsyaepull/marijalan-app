'use client';

import { useState } from 'react';
import Layout from '@/components/layout';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { CustomBreadcrumb } from '@/components/ui/custom-breadcrumb';
import { useBreadcrumb } from '@/hooks/useBreadcrumb';
import usePromo from '@/hooks/usePromo';
import PromoCard, { PromoItem } from '@/components/card/promoCard';
import PromoDetailDialog from '@/components/dialog/PromoDetailDialog';
import { Skeleton } from '@/components/ui/skeleton'; 

export default function PromosPage() {
    const { data, isLoading, error, } = usePromo();
    const [searchQuery, setSearchQuery] = useState('');
    const breadcrumbItems = useBreadcrumb();
    const [selectedPromo, setSelectedPromo] = useState<PromoItem | null>(null);

    if (isLoading) {
        return (
            <Layout>
                <section className="p-4 md:p-8 lg:p-10 space-y-4 md:space-y-8 lg:space-y-10">
                    <CustomBreadcrumb items={breadcrumbItems} className="max-w-7xl px-4 md:mx-auto" />
                    <div className="max-w-7xl px-4 mx-auto">
                        <div className="space-y-8">
                            {/* Header Skeleton */}
                            <div className="space-y-2">
                                <Skeleton className="h-8 w-3/4 md:w-1/2" />
                                <Skeleton className="h-4 w-full md:w-3/4" />
                            </div>
                            {/* Search Bar Skeleton */}
                            <div className="w-full md:max-w-md lg:max-w-lg mb-12">
                                <Skeleton className="h-12 w-full" />
                            </div>
                            {/* Promos Grid Skeleton */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <Skeleton key={index} className="h-64 w-full" />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const searchPromo = (promos: PromoItem[]) => {
        return promos.filter(
            (promo) =>
                promo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                promo.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const filteredPromos = searchPromo(data as PromoItem[]);

    return (
        <Layout>
            <section className="p-4 md:p-8 lg:p-10 space-y-4 md:space-y-8 lg:space-y-10">
                <CustomBreadcrumb items={breadcrumbItems} className="max-w-7xl px-4 md:mx-auto" />
                <div className="max-w-7xl px-4 mx-auto">
                    <div className="space-y-8">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="space-y-2">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                    Discover Amazing Promotions!
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
                                    Find the best deals on vacations and flights to over 1,300 destinations worldwide. Enjoy exclusive offers with Xplore Vacations.
                                </p>
                            </div>
                        </div>
                        {/* Search Bar */}
                        <div className="w-full md:max-w-md lg:max-w-lg mb-12">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <Input
                                    type="text"
                                    placeholder="Search Promo..."
                                    className="pl-10 h-12 w-full"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Promos Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredPromos.map((promo) => (
                                <PromoCard
                                    key={promo.id}
                                    promo={promo}
                                    onClick={() => setSelectedPromo(promo)} // Set selected promo on click
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <PromoDetailDialog promo={selectedPromo} onClose={() => setSelectedPromo(null)} open={!!selectedPromo} />
        </Layout>
    );
}