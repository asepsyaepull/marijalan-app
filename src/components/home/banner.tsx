'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import useBanner from '@/hooks/useBanner';
import BannerCard from '../card/bannerCard';

export function BannerSection() {
    const { data: banners, isLoading, error } = useBanner();
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
    };

    if (isLoading) {
        return <Skeleton className="w-full h-64" />;
    }

    if (error) {
        return <p className="text-red-500">Failed to load banners</p>;
    }

    return (
        <section className="relative p-4 md:py-10 max-w-7xl px-4 mx-auto">
            <div className="relative w-full h-fit">
                {banners.length > 0 ? (
                    <BannerCard banner={banners[currentIndex]} />
                ) : (
                    <Skeleton className="w-full h-64" />
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full"
                    onClick={handlePrevious}
                >
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full"
                    onClick={handleNext}
                >
                    <ChevronRight className="h-6 w-6" />
                </Button>
            </div>
        </section>
    );
}
