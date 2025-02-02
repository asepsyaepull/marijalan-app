'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import { useUser } from '@/context/UserContext';
import useExperienceId from '@/hooks/useActivityId';
import useAddCart from '@/hooks/cart/useAddCart';
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

export default function QuickInfoFloatingButton() {
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

    if (isLoading) {
        return null;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-4 shadow-lg border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col justify-between space-y-2">
                {/* Price */}
                <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Price</p>
                    <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-bold text-orange-500">Rp{data?.price.toLocaleString()}</p>
                        <span className="text-sm text-gray-600 dark:text-gray-400">/pax</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 py-2">
                    <Button className="w-full bg-orange-500 hover:bg-orange-500/90 text-white" onClick={handleAddToCart} disabled={isAddingToCart}>
                        Book Now
                    </Button>
                    <Button variant="outline" className="w-full border-orange-500 text-orange-500 hover:bg-orange-500/10" onClick={handleAddToCart} disabled={isAddingToCart}>
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
