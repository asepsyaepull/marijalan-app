'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

export type CategoryType = {
    id: string;
    imageUrl: string;
    name: string;
    description?: string;
};

type CategoryCardProps = {
    category: CategoryType;
};

export default function CategoryCard({ category }: CategoryCardProps) {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="group relative rounded-2xl overflow-hidden">
            {/* Background Image */}
            <div className="relative aspect-[4/3] w-full">
                <Image
                    src={imageError ? '/default-image.png' : category.imageUrl}
                    alt={category.name}
                    fill
                    className={`object-cover transition-transform group-hover:scale-105 ${imageError ? 'object-none bg-gray-100' : ''}`}
                    onError={() => setImageError(true)}
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
                <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                </button>
            </div>

            {/* Description (if provided) */}
            {category.description && (
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6">
                    <p className="text-white text-center">
                        {category.description}
                    </p>
                </div>
            )}
        </div>
    );
}