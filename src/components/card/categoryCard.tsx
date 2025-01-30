'use client';

import Image from 'next/image';
import { useState } from 'react';

export interface CategoryType {
    id: string;
    name: string;
    imageUrl: string;
}

export default function CategoryCard({ category }: { category: CategoryType }) {
    const [imageError, setImageError] = useState(false);
    const [loading, setLoading] = useState(true);

    return (
        <div className="group relative rounded-2xl overflow-hidden">
            {/* Background Image */}
            <div className="relative aspect-[4/3] w-full">
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                        <div className="w-16 h-16 border-4 border-gray-300 border-t-transparent border-t-4 rounded-full animate-spin"></div>
                    </div>
                )}
                <Image
                    src={imageError ? '/default-image.png' : category.imageUrl}
                    alt={category.name}
                    fill
                    className={`object-cover transition-transform group-hover:scale-105 ${imageError ? 'object-none bg-gray-100' : ''}`}
                    onError={() => setImageError(true)}
                    onLoadingComplete={() => setLoading(false)}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-white">
                        {category.name}
                    </span>
                </div>
            </div>
        </div>
    );
}