'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export type PromoType = {
    id: number;
    image: string;
    title: string;
    subtitle: string;
    discount: string;
    tag?: string;
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
                {loading ? (
                    <Skeleton className="w-full h-full" />
                ) : (
                    <Image
                        src={imageError ? '/default-image.png' : promo.image}
                        alt={promo.title}
                        fill
                        className={`object-cover transition-transform group-hover:scale-105 ${imageError ? 'object-none bg-gray-100' : ''}`}
                        onError={() => setImageError(true)}
                    />
                )}
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
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
                            <h3 className="text-2xl font-bold text-white">
                                {promo.title}
                            </h3>
                            <p className="text-white/90 text-sm mt-1">
                                {promo.subtitle}
                            </p>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-orange-500">
                                {promo.discount}
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
            </div>
        </div>
    );
}