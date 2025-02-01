'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import useGetTransactions from '@/hooks/transactions/useGetTransactions';
import { FORMAT_DATE } from '@/helper/convertTime';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import Link from 'next/link';

const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case "success":
            return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
        case "pending":
            return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
        case "cancelled":
            return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
        default:
            return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
    }
};

export default function OrderCard({ id }: { id: string }) {
    const { data, isLoading, error } = useGetTransactions();
    const [imageError, setImageError] = useState(false);

    if (isLoading) {
        return (
            <div className="w-full h-full p-4 bg-white dark:bg-gray-800 rounded-lg animate-pulse">
                <Skeleton className="w-24 h-24 rounded-lg" />
                <div className="flex-1 space-y-4 py-1">
                    <Skeleton className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
                    <Skeleton className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
                    <Skeleton className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4" />
                </div>
            </div>
        );
    }

    if (error) return <div>Error loading order data</div>;

    const order = data.find(order => order.id === id);
    if (!order) return <div>Order not found</div>;

    const { invoiceId, status, orderDate, expiredDate, transaction_items } = order;
    const quantity = transaction_items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <Link href={`/orders/${id}`}>
            <div className="bg-white dark:bg-gray-800 border border-gray-100 hover:shadow-md rounded-lg p-4 my-2 cursor-pointer">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative w-full md:w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                            src={imageError ? '/default-image.png' : transaction_items[0].imageUrls[0]}
                            alt={transaction_items[0].title}
                            fill
                            className={`object-cover transition-transform ${imageError ? 'object-none bg-gray-100' : ''}`}
                            onError={() => setImageError(true)}
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                            <div>
                                <div className="flex md:flex-row justify-between md:items-center gap-4 mt-4 md:mt-0">
                                <p className="text-sm text-gray-500">{invoiceId}</p>
                                    <Badge className={`${getStatusColor(status)} block md:hidden`}>
                                        {status}
                                    </Badge>
                                </div>
                                <h3 className="font-medium text-gray-900 dark:text-white mt-1">{transaction_items[0].title}</h3>
                                <p className="text-sm text-gray-500 mt-1">Order Date: {FORMAT_DATE(orderDate)}</p>
                                <p className="text-sm text-gray-500 mt-1">Expired: {FORMAT_DATE(expiredDate)}</p>
                            </div>


                            <div className="flex flex-col gap-8 items-end h-full">
                                <Badge className={`${getStatusColor(status)} hidden md:block`}>
                                    {status}
                                </Badge>
                                <span className="text-lg font-bold text-orange-500">
                                    {quantity} x Rp{transaction_items[0].price.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}