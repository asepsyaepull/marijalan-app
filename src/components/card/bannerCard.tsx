'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export type BannerItem = {
    id: string;
    imageUrl: string;
    name: string;
    createdAt: string;
    updatedAt: string;
};

type BannerCardProps = {
    banner: BannerItem;
};

export default function BannerCard({ banner }: BannerCardProps) {
    const [imageError, setImageError] = useState(false);
    const [loading, setLoading] = useState(true);

    return (
        <div className="relative w-full h-[360px] md:h-[512px] rounded-3xl overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                        <div className="w-16 h-16 border-4 border-gray-300 border-t-transparent border-t-4 rounded-full animate-spin"></div>
                    </div>
                )}
                <Image
                    src={ imageError? '/default-image.png': banner.imageUrl}
                    alt={banner.name}
                    fill
                    priority
                    className={`object-cover transition-transform group-hover:scale-105 ${imageError ? 'object-none bg-gray-100' : ''}`}
                    onError={() => setImageError(true)}
                    onLoadingComplete={() => setLoading(false)}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
        </div>
    );
}