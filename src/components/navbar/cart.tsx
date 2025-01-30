'use client';

import { ShoppingCart} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import useGetCart from '@/hooks/cart/useGetCart';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import { useRouter } from 'next/router';

interface CartProps {
    className?: string;
}

export default function Cart({ className }: CartProps) {
    const { data: cartItems, isLoadingCart, errorCart } = useGetCart();
    const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});
    const router = useRouter();

    if (isLoadingCart) {
        return <Skeleton className="w-full h-full" />;
    }

    if (errorCart) {
        return <div>Error: {errorCart}</div>;
    }

    const itemCount = cartItems.length;
    const total = cartItems.reduce((sum, item) => sum + item.activity.price * item.quantity, 0);

    return (
        <div className={className}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                        <ShoppingCart className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                        {itemCount > 0 && (
                            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-orange-500 text-[10px] font-medium text-white flex items-center justify-center">
                                {itemCount}
                            </span>
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                    <div className="flex items-center justify-between px-4 py-2 border-b">
                        <h2 className="font-semibold">Shopping Cart</h2>
                        <span className="text-sm text-muted-foreground">
                            {itemCount} items
                        </span>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                        {cartItems.map((item) => (
                            <DropdownMenuItem
                                key={item.id}
                                className="flex items-start gap-3 px-4 py-3 cursor-default"
                            >
                                <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                                    <Image
                                        src={imageError[item.id] ? '/default-image.png' : Array.isArray(item.activity.imageUrls) ? item.activity.imageUrls[0] : item.activity.imageUrls}
                                        alt={item.activity.title}
                                        width={64}
                                        height={64}
                                        className={`h-full w-full object-cover transition-transform ${imageError[item.id] ? 'object-none bg-gray-100' : ''}`}
                                        onError={() => setImageError(prev => ({ ...prev, [item.id]: true }))}
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium">{item.activity.title}</p>
                                    <p className="text-xs text-muted-foreground">Qty : {item.quantity}</p>
                                    <p className="text-sm font-medium text-orange-500 mt-1">
                                        Rp{item.activity.price.toLocaleString()}
                                    </p>
                                </div>
                                {/* <DeleteCartButton
                                    cartId={item.id}
                                    refreshCart={refreshCart}
                                /> */}
                            </DropdownMenuItem>
                        ))}
                    </div>
                    {itemCount > 0 ? (
                        <div className="p-4 border-t">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-medium">Total</span>
                                <span className="text-sm font-medium">
                                    Rp{total.toLocaleString()}
                                </span>
                            </div>
                            <Button
                                className="w-full bg-orange-500 hover:bg-orange-500/90"
                                onClick={() => router.push('/cart')}
                            >
                                Checkout
                            </Button>
                        </div>
                    ) : (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                            Your cart is empty
                        </div>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}