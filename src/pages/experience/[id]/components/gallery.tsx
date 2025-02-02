'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import useExperienceId from '@/hooks/useActivityId';

const dummyImages = [
    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2938&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=2940&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=2875&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?q=80&w=2940&auto=format&fit=crop'
];

export default function Gallery() {
    const { data } = useExperienceId();
    const [currentImage, setCurrentImage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const [images, setImages] = useState(dummyImages);

    useEffect(() => {
        if (data?.imageUrls.length) {
            setImages([...data.imageUrls, ...dummyImages]);
        }
    }, [data]);

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % images.length);
        setLoading(true);
        setImageError(false);
    };

    const previousImage = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
        setLoading(true);
        setImageError(false);
    };

    return (
        <div className="relative rounded-lg overflow-hidden">
            <div className="aspect-[16/9] relative">
                {loading && <Skeleton className="w-full h-full" />}
                <Image
                    src={imageError ? '/default-image.png' : images[currentImage]}
                    alt="Destination"
                    fill
                    className={`object-cover transition-transform group-hover:scale-105 ${imageError ? 'object-none bg-gray-100' : ''}`}
                    priority
                    onLoadingComplete={() => setLoading(false)}
                    onError={() => setImageError(true)}
                />

                {/* Navigation Buttons */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full"
                    onClick={previousImage}
                >
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full"
                    onClick={nextImage}
                >
                    <ChevronRight className="h-6 w-6" />
                </Button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                    {currentImage + 1} / {images.length}
                </div>
            </div>

            {/* Thumbnail Preview */}
            <div className="grid grid-cols-5 gap-2 m-2">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setCurrentImage(index);
                            setLoading(true);
                            setImageError(false);
                        }}
                        className={`relative aspect-[16/9] rounded-lg overflow-hidden ${currentImage === index ? 'ring-2 ring-orange-500' : ''}`}
                    >
                        {loading && <Skeleton className="w-full h-full" />}
                        <Image
                            src={imageError ? '/default-image.png' : image}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            className={`object-cover transition-transform group-hover:scale-105 ${imageError ? 'object-none bg-gray-100' : ''}`}
                            onLoadingComplete={() => setLoading(false)}
                            onError={() => setImageError(true)}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}