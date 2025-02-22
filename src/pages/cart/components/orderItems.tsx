'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import useUpdateCart from '@/hooks/cart/useUpdateCart';
import { useState, useEffect } from 'react';
import useGetCart from '@/hooks/cart/useGetCart';
import DeleteCartButton from './deleteButton';
import { Skeleton } from '@/components/ui/skeleton';

interface ActivityItem {
    id: string;
    activity: {
        title: string;
        city: string;
        price: number;
        price_discount?: number;
        imageUrls: string[];
    };
    quantity: number;
}

interface OrderItemsProps {
    items: ActivityItem[];
    selectedItems: string[];
    setSelectedItems: (items: string[] | ((prevSelected: string[]) => string[])) => void;
    setSubtotal: (value: number) => void;
    setTotal: (value: number) => void;
    discount: number;
    refreshCart: () => void;
}

export default function OrderItems({ items, selectedItems, setSelectedItems, setSubtotal, setTotal, discount, refreshCart }: OrderItemsProps) {
    const { data: cartItems, isLoadingCart } = useGetCart();
    const { updateQuantity, isLoading: isLoadingUpdate } = useUpdateCart();
    const [selectAll, setSelectAll] = useState(false);
    const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const newSubtotal = items
            .filter(item => selectedItems.includes(item.id))
            .reduce((sum, item) => sum + (item.activity.price * item.quantity), 0);
        setSubtotal(newSubtotal);
        setTotal(newSubtotal - discount);
    }, [items, selectedItems, discount, setSubtotal, setTotal]);

    const handleQuantityChange = async (id: string, quantity: number) => {
        try {
            await updateQuantity(id, quantity);
            refreshCart();
        } catch (err) {
            console.error(err);
        }
    };

    const handleSelectItem = (id: string) => {
        setSelectedItems((prevSelected: string[]) => {
            const isSelected = prevSelected.includes(id);
            if (isSelected) {
                return prevSelected.filter((itemId: string) => itemId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };

    const handleSelectAll = () => {
        if (cartItems && selectedItems.length === cartItems.length) {
            setSelectedItems([]);
        } else if (cartItems) {
            setSelectedItems(cartItems.map((item) => item.id));
        }
        setSelectAll(!selectAll);
    };

    if (isLoadingCart) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg animate-pulse">
                        <Skeleton className="w-24 h-24 rounded-lg" />
                        <div className="flex-1 space-y-4 py-1">
                            <Skeleton className="h-4 rounded w-3/4" />
                            <Skeleton className="h-4 rounded w-1/2" />
                        </div>
                        <div className="flex md:items-center gap-2">
                            <Skeleton className="h-8 w-8 rounded" />
                            <Skeleton className="h-8 w-8 rounded" />
                            <Skeleton className="h-8 w-8 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className='flex px-4 justify-between md:items-center'>
                <div className="flex md:items-center gap-2">
                    <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                    />
                    <span>Select All</span>
                </div>
                {cartItems && (
                    <span className="text-gray-500">
                        {selectedItems.length} item(s) selected
                    </span>
                )}
            </div>
            {items.map((item) => (
                <div
                    key={item.id}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg cursor-pointer"
                    onClick={() => handleSelectItem(item.id)}
                >
                    <div className="flex md:items-center gap-2">
                        <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleSelectItem(item.id)}
                            className="cursor-pointer"
                        />
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                                src={imageError[item.id] ? '/default-image.png' : item.activity.imageUrls[0]}
                                alt={item.activity.title}
                                fill
                                className="object-cover"
                                onError={() => setImageError(prev => ({ ...prev, [item.id]: true }))}
                            />
                        </div>  

                        <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 dark:text-white">{item.activity.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{item.activity.city}</p>
                            <div className="mt-2">
                                <span className="text-lg font-bold text-orange-500">
                                    {item.activity.price !== undefined && (
                                        <span className="text-lg font-bold text-orange-500">
                                            Rp{item.activity.price.toLocaleString()}
                                        </span>
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end md:items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleQuantityChange(item.id, Math.max(1, item.quantity - 1));
                            }}
                            disabled={isLoadingUpdate || item.quantity === 1}
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleQuantityChange(item.id, item.quantity + 1);
                            }}
                            disabled={isLoadingUpdate}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                        <DeleteCartButton
                            cartId={item.id}
                            refreshCart={refreshCart}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}