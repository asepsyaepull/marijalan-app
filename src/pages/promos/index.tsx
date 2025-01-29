'use client';

import { useState } from 'react';
import Layout from '@/components/layout';
import { Copy, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { CustomBreadcrumb } from '@/components/ui/custom-breadcrumb';
import { useBreadcrumb } from '@/hooks/useBreadcrumb';
import usePromo from '@/hooks/usePromo';
import PromoCard, { PromoItem } from '@/components/card/promoCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog'; // Import Dialog components
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

export default function PromosPage() {
    const { data, isLoading, error, } = usePromo();
    const [searchQuery, setSearchQuery] = useState('');
    const breadcrumbItems = useBreadcrumb();
    const [selectedPromo, setSelectedPromo] = useState<PromoItem | null>(null);
    const [copied, setCopied] = useState(false);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const createMarkup = (htmlContent: string) => {
        return { __html: htmlContent };
    };

    const searchPromo = (promos: PromoItem[]) => {
        return promos.filter(
            (promo) =>
                promo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                promo.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const filteredPromos = searchPromo(data as PromoItem[]);

    const copyToClipboard = () => {
        if (selectedPromo) {
            navigator.clipboard.writeText(selectedPromo.promo_code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

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

            {/* Dialog */}
            {selectedPromo && (
                <Dialog open={!!selectedPromo} onOpenChange={() => setSelectedPromo(null)}>
                    <DialogContent className="sm:max-w-[425px] md:max-w-xl">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-orange-500">{selectedPromo.title}</DialogTitle>
                            {selectedPromo.imageUrl && (
                                <img src={selectedPromo.imageUrl} alt={selectedPromo.title} className="w-full h-auto rounded-lg mt-4" />
                            )}
                            <DialogDescription className="text-gray-600 dark:text-gray-300">
                                {selectedPromo.description}
                            </DialogDescription>
                        </DialogHeader>
                        <Separator className="my-4" />
                        <div className="space-y-4">
                            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Promo Code</p>
                                <div className="flex items-center justify-between mt-1">
                                    <code className="text-lg font-bold text-orange-600 dark:text-orange-400">{selectedPromo.promo_code}</code>
                                    <Button size="sm" variant="ghost" onClick={copyToClipboard}>
                                        {copied ? "Copied!" : <Copy size={16} />}
                                    </Button>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Discount</p>
                                    <p className="text-lg font-bold text-green-600 dark:text-green-400">
                                        Rp{selectedPromo.promo_discount_price.toFixed(2)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Minimum Claim</p>
                                    <p className="text-lg font-bold text-gray-700 dark:text-gray-200">
                                        Rp{selectedPromo.minimum_claim_price.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Terms and Conditions</p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                                    <div dangerouslySetInnerHTML={createMarkup(selectedPromo.terms_condition || '')} />
                                </p>
                            </div>
                        </div>
                        <DialogClose asChild>
                            <Button variant="outline" className="w-full mt-4">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogContent>
                </Dialog>
            )}
        </Layout>
    );
}