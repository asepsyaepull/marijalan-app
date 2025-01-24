'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export type PromoType = {
    id: string;
    imageUrl: string;
    title: string;
    description: string;
    terms_condition: string;
    promo_code: string;
    promo_discount_price: number;
    minimum_claim_price: number;
    createdAt: string;
    updatedAt: string;
};

type PromoCardProps = {
    promo: PromoType;
};

export default function PromoCard({ promo }: PromoCardProps) {
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        // Simulate data fetching
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <div className="relative group rounded-2xl overflow-hidden">
            {/* Background Image */}
            <div className="relative h-[200px] w-full">
                <Button
                    variant="ghost"
                >
                {loading ? (
                    <Skeleton className="w-full h-full" />
                ) : (
                    <Image
                            src={imageError ? '/default-image.png' : promo.imageUrl}
                        alt={promo.title}
                        fill
                        className={`object-cover transition-transform group-hover:scale-105 ${imageError ? 'object-none bg-gray-100' : ''}`}
                        onError={() => setImageError(true)}
                    />
                )}
                {/* Gradient Overlay */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" /> */}
                </Button>
            </div>

            {/* Content */}
            {/* <div className="absolute inset-0 p-6 flex flex-col justify-end">
                {loading ? (
                    <>
                        <Skeleton className="h-6 w-1/4 mb-2" />
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-4 w-1/2 mt-1" />
                    </>
                ) : (
                    <>
                        <div>
                                {promo.tag && (
                                <span className="inline-block px-3 py-1 bg-white/90 rounded-full text-sm font-medium text-gray-900 mb-2">
                                    {promo.tag}
                                </span>
                            )}
                            <h3 className="text-xl font-bold text-white">
                                {promo.title}
                            </h3>
                                <p className="text-white/90 text-sm mt-1">
                                {promo.subtitle}
                            </p>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-orange-500">
                                    {promo.promo_discount_price}
                            </span>
                            <Button
                                variant="ghost"
                                className="text-white hover:bg-white/20 hover:underline"
                            >
                                Book Now →
                            </Button>
                        </div>
                    </>
                )}
            </div> */}
        </div>
    );
}