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
                {/* <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" /> */}
            </div>

            {/* Content */}
            <div className="relative h-full max-w-7xl mx-auto px-4 md:px-8 flex items-end py-10">
                <div className="max-w-2xl space-y-6">
                    {/* <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                        {banner.name}
                    </h1> */}
                    <Button
                        size="lg"
                        className="bg-orange-500 hover:bg-orange-500/90 text-white"
                    >
                        See Detail
                    </Button>
                </div>
            </div>
        </div>
    );
}