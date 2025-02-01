'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export interface PromoItem {
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
}

type PromoCardProps = {
    promo: PromoItem;
    onClick: () => void; 
};

export default function PromoCard({ promo, onClick }: PromoCardProps) {
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
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
        <div className="relative group rounded-2xl overflow-hidden cursor-pointer" onClick={onClick}>
            <div className="relative h-[200px] w-full">
                {loading ? (
                    <Skeleton className="w-full h-full" />
                ) : (
                    <Image
                        src={imageError ? '/default-image.png' : formatImageUrl(promo.imageUrl)}
                        alt={promo.title}
                        fill
                        className={`object-cover transition-transform group-hover:scale-105 ${imageError ? 'object-none bg-gray-100' : ''}`}
                        onError={() => setImageError(true)}
                        onLoadingComplete={() => setLoading(false)}
                    />
                )}
            </div>
        </div>
    );
}