'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger, SheetClose } from '@/components/ui/sheet';
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

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    return (
        <div className={className}>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                        <ShoppingCart className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                        {itemCount > 0 && (
                            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-orange-500 text-[10px] font-medium text-white flex items-center justify-center">
                                {itemCount}
                            </span>
                        )}
                    </Button>
                </SheetTrigger>
                <SheetContent side={isMobile ? "bottom" : "right"} className="w-full h-screen border-gray-100 p-0 sm:w-full md:w-96 overflow-auto">
                    <SheetHeader className='sticky top-0 bg-white dark:bg-slate-900 border-b border-gray-100 px-4 md:px-6 py-4 shadow-sm justify-between items-start z-10 flex flex-row'>
                        <div className='flex flex-col items-start'>
                            <SheetTitle>My Cart</SheetTitle>
                            <SheetDescription>{itemCount} items</SheetDescription>
                        </div>
                        <SheetClose asChild>
                            <Button variant="ghost" size="icon">
                                <span className="sr-only">Close</span>
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </Button>
                        </SheetClose>
                    </SheetHeader>
                    <div className="h-full p-4 md:p-6 overflow-y-auto bg-white dark:bg-slate-800">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex items-start gap-3 py-4 ">
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
                            </div>
                        ))}
                    </div>
                    {itemCount > 0 ? (
                        <div className="sticky bottom-0 bg-white dark:bg-slate-900 p-4 md:p-6 border-t border-gray-100 shadow-md shadow-top-md">
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
                </SheetContent>
            </Sheet>
        </div>
    );
}