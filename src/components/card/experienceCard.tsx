'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MapPin, Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export interface CategoryItem {
    id: string;
    imageUrl: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export type ExperienceType = {
    id: string;
    category: CategoryItem;
    imageUrls: string[];
    title: string;
    description: string;
    price: number;
    price_discount: number;
    rating: number;
    total_reviews: number;
    facilities: string;
    address: string;
    province: string;
    city: string;
    location_maps: string;
    createdAt: string;
    updatedAt: string;
};

type ExperienceCardProps = {
    experience: ExperienceType;
};

export default function ExperienceCard({ experience }: ExperienceCardProps) {
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
                        src={imageError ? '/default-image.png' : experience.imageUrls[0]}
                        alt={experience.title}
                        fill
                        className={`object-cover transition-transform group-hover:scale-105 ${imageError ? 'object-none bg-gray-100' : ''}`}
                        onError={() => setImageError(true)}
                        onLoadingComplete={() => setLoading(false)}
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
                            {experience.title}
                        </h3>
                        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{experience.city}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-orange-500 font-semibold">
                                Rp{experience.price.toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">/pax</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm">{experience.rating} ({experience.total_reviews} reviews)</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}