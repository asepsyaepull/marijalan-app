'use client';

import { MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import useExperienceId from '@/hooks/useActivityId';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/router';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import useAddCart from '@/hooks/cart/useAddCart';

export default function QuickInfo() {
    const { data, isLoading, error } = useExperienceId();
    const { user } = useUser();
    const router = useRouter();
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const { addToCart, isLoading: isAddingToCart } = useAddCart();

    const handleConfirmLogin = async () => {
        setIsAlertOpen(false);
        router.push('/login');
    };

    const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!user) {
            e.preventDefault();
            setIsAlertOpen(true);
        } else {
            try {
                if (data) {
                    await addToCart(data.id);
                }
                // router.push('/cart');
            } catch (err) {
                console.error(err);
            }
        }
    };

    {/* Skeleton Loading */}
    if (isLoading) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm h-fit sticky top-24 border border-gray-200 dark:border-gray-700">
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Skeleton className="h-4 w-1/4 mb-4" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-full mb-4" />
            </div>
        );
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm h-fit sticky top-24 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-4">Quick Information</h2>

            {/* Category */}
            <div className="space-y-4">
                <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Category</p>
                    <p className="font-medium">{data?.category.name}</p>
                </div>

                {/* Location */}
                <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                    <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <p className="font-medium">{data?.city}, {data?.province}</p>
                    </div>
                </div>

                {/* Rating */}
                <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Rating</p>
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{data?.rating}/5</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">({data?.total_reviews}+ reviews)</span>
                    </div>
                </div>

                <Separator />

                {/* Price */}
                <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Price</p>
                    <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-bold text-orange-500">Rp{data?.price.toLocaleString()}</p>
                        <span className="text-sm text-gray-600 dark:text-gray-400">/pax</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <Button className="w-full bg-orange-500 hover:bg-orange-500/90 text-white" onClick={handleAddToCart} disabled={isAddingToCart}>
                        Book Now
                    </Button>
                    <Button variant="outline" className="w-full border-orange-500 text-orange-500 hover:bg-orange-500/10 hover:text-orange-600" onClick={handleAddToCart} disabled={isAddingToCart}>
                        Add to Cart
                    </Button>
                </div>
            </div>

            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Login Required</AlertDialogTitle>
                        <AlertDialogDescription>
                            Please log in to continue booking this experience.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmLogin}>
                            Log in
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}