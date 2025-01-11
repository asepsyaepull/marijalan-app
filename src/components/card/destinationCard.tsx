'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export type DestinationType = {
    id: number;
    image: string;
    title: string;
    location: string;
    price: number;
    category: string;
};

type DestinationCardProps = {
    destination: DestinationType;
};

export default function DestinationCard({ destination }: DestinationCardProps) {
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        // Simulate data fetching
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <div className="group rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all">
            <div className="relative h-48 w-full">
                {loading ? (
                    <Skeleton className="w-full h-full" />
                ) : (
                    <Image
                        src={imageError ? '/default-image.png' : destination.image}
                        alt={destination.title}
                        fill
                        className={`object-cover transition-transform group-hover:scale-105 ${imageError ? 'object-none bg-gray-100' : ''}`}
                        onError={() => setImageError(true)}
                    />
                )}
            </div>
            <div className="p-4 space-y-2">
                {loading ? (
                    <>
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/4" />
                    </>
                ) : (
                    <>
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                            {destination.title}
                        </h3>
                        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{destination.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-orange-500 font-semibold">
                                ${destination.price.toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">/person</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}