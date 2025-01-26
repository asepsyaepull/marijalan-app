'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import useGetTransactions from '@/hooks/transactions/useGetTransactions';
import { FORMAT_DATE } from '@/helper/convertTime';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

type OrderStatus = 'Waiting' | 'Success' | 'Canceled' | 'Failed';

const statusStyles = {
    Waiting: 'bg-orange-100 text-orange-600',
    Success: 'bg-green-100 text-green-600',
    Canceled: 'bg-red-100 text-red-600',
    Failed: 'bg-red-100 text-red-600',
};

export default function OrderCard({ id }: { id: string }) {
    const { data, isLoading, error } = useGetTransactions();
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const router = useRouter();


    useEffect(() => {
        setLoading(isLoading);
    }, [isLoading]);

    if (loading) return <Skeleton className="w-full h-full" />;
    if (error) return <div>Error loading order data</div>;

    const order = data.find(order => order.id === id);
    if (!order) return <div>Order not found</div>;

    const { invoiceId, status, totalAmount, orderDate, expiredDate, transaction_items } = order;
    const originalPrice = transaction_items.reduce((acc, item) => acc + item.price, 0);
    const quantity = transaction_items.reduce((acc, item) => acc + item.quantity, 0);

    const handleCardClick = () => {
        router.push(`/orders/${id}`);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 cursor-pointer" onClick={handleCardClick}>
            <div className="flex gap-4">
                <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    {loading ? (
                        <Skeleton className="w-full h-full" />
                    ) : (
                        <Image
                            src={imageError ? '/default-image.png' : transaction_items[0].imageUrls[0]}
                            alt={transaction_items[0].title}
                            fill
                            className={`object-cover transition-transform ${imageError ? 'object-none bg-gray-100' : ''}`}
                            onError={() => setImageError(true)}
                            onLoadingComplete={() => setLoading(false)}
                        />
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-gray-500">{invoiceId}</p>
                            <h3 className="font-medium text-gray-900 dark:text-white mt-1">{transaction_items[0].title}</h3>
                            <p className="text-sm text-gray-500 mt-1">Order Date: {FORMAT_DATE(orderDate)}</p>
                            <p className="text-sm text-gray-500 mt-1">Expired: {FORMAT_DATE(expiredDate)}</p>
                        </div>
                        <Badge className={statusStyles[status as OrderStatus]}>
                            {status}
                        </Badge>
                    </div>

                    <div className="mt-2 flex justify-end items-end">
                        <div>
                            <span className="text-sm text-gray-500 line-through">
                                Rp{originalPrice.toLocaleString()}
                            </span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-lg font-bold text-orange-500">
                                    {quantity} x Rp{totalAmount.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}