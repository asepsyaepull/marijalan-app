'use client';

import { ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';

// Sample cart items - in a real app, this would come from your cart state management
const cartItems = [
    {
        id: 1,
        title: 'Trip to Bali',
        description: 'June 12 - June 18',
        price: 2100,
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2938&auto=format&fit=crop',
    },
    {
        id: 2,
        title: 'Paris Adventure',
        description: 'July 5 - July 12',
        price: 2500,
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2946&auto=format&fit=crop',
    },
];

export default function Cart() {
    const itemCount = cartItems.length;
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

    return (
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
                                    src={item.image}
                                    alt={item.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium">{item.title}</p>
                                <p className="text-xs text-muted-foreground">{item.description}</p>
                                <p className="text-sm font-medium text-orange-500 mt-1">
                                    ${item.price.toLocaleString()}
                                </p>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-red-600"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </DropdownMenuItem>
                    ))}
                </div>
                {itemCount > 0 ? (
                    <div className="p-4 border-t">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium">Total</span>
                            <span className="text-sm font-medium">
                                ${total.toLocaleString()}
                            </span>
                        </div>
                        <Button className="w-full bg-orange-500 hover:bg-orange-500/90">
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
    );
}