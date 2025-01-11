import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type DestinationCardProps = {
    image: string;
    title: string;
    location: string;
    price: number;
};

export default function DestinationCard({ image, title, location, price }: DestinationCardProps) {
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        // Simulate data fetching
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <Card className="group overflow-hidden">
            <div className="relative h-[200px] w-full">
                {loading ? (
                    <Skeleton className="w-full h-full" />
                ) : (
                    <Image
                        src={imageError ? '/default-image.png' : image}
                        alt={title}
                        fill
                        className={`object-cover transition-transform group-hover:scale-105 ${imageError ? 'object-none bg-gray-100' : ''}`}
                        onError={() => setImageError(true)}
                    />
                )}
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{location}</p>
                <p className="text-orange-500 font-semibold mt-2">${price.toLocaleString()}</p>
            </div>
        </Card>
    );
}