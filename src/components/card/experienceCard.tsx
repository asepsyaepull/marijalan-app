'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

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

    const formatImageUrl = (url: string) => {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        return `/${url}`;
    };

    return (
        <Link href={`/experience/${experience.id}`} className="group">
            <div className="group rounded-2xl overflow-hidden border border-gray-100 bg-white dark:bg-gray-800 transition-all h-full">
                <div className="relative h-48 w-full">
                    {loading ? (
                        <Skeleton className="w-full h-full" />
                    ) : (
                        <Image
                            src={imageError ? '/default-image.png' : formatImageUrl(experience.imageUrls[0])}
                            alt={experience.title}
                            fill
                            className={`object-cover transition-transform group-hover:scale-105 ${imageError ? 'object-none bg-gray-100' : ''}`}
                            onError={() => setImageError(true)}
                            onLoadingComplete={() => setLoading(false)}
                        />
                    )}
                </div>
                <div className="p-4 space-y-0.5">
                    {loading ? (
                        <>
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-4 w-1/3" />
                            <Skeleton className="h-4 w-1/4" />
                        </>
                    ) : (
                        <>
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                                {experience.title}
                            </h3>
                            <div className="flex items-center gap-1">
                                <span className="text-yellow-400">★</span>
                                <span className="text-sm font-medium">{experience.rating}</span>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    ({experience.total_reviews} reviews)
                                </span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm">{experience.city}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-orange-500 font-semibold">
                                    Rp{experience.price.toLocaleString()}
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Link>
    );
}