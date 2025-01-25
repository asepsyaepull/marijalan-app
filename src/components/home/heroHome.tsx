'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import Link from next/link
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import useExperience from '@/hooks/useExperience';


export default function HeroSection() {
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});
    const { data: experiences, isLoading } = useExperience();

    useEffect(() => {
        if (!isLoading) {
            setLoading(false);
        }
    }, [isLoading]);

    const handleImageError = (id: string) => {
        setImageError((prev) => ({ ...prev, [id]: true }));
    };

    const topExperiences = experiences
        ? experiences.sort((a, b) => b.rating - a.rating).slice(0, 3)
        : [];

    return (
        <section className="relative p-4 md:py-8 max-w-7xl mx-auto ">
            {/* Main Hero */}
            <div className="relative w-full h-[360px] md:h-[512px] rounded-3xl overflow-hidden">
                {loading ? (
                    <Skeleton className="w-full h-full" />
                ) : (
                        <Image
                            src={imageError['hero'] ? '/default-image.png' : 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2368&auto=format&fit=crop'}
                            alt="Tropical paradise"
                            fill
                            priority
                            className={`object-cover ${imageError['hero'] ? 'object-scale-down bg-gray-100' : ''}`}
                            onError={() => handleImageError('hero')}
                        />
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                {/* Hero Content */}
                <div className="absolute bottom-2 p-6 md:px-10">
                    <div className="max-w-4xl space-y-1 md:space-y-4">
                        <span className="inline-block text-white/90 font-medium text-sm md:text-base">
                            #exploretheworld
                        </span>
                        <h1 className="text-4xl md:text-7xl font-bold text-white">
                            Let's Travel The Beautiful
                        </h1>
                    </div>
                </div>
            </div>

            {/* Featured Destinations */}
            <div className=" relative w-full bg-gray-50 dark:bg-slate-900 rounded-3xl overflow-hidden">
                {/* Main Content */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8 py-4 px-6 md:px-10">
                    <div className="space-y-4 max-w-4xl">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
                            World Together
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            We always make our customer happy by providing as many choices as possible
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <Button
                                variant="default"
                                className="rounded-full"
                            >
                                Explore More
                            </Button>
                            <Button
                                variant="outline"
                                className="rounded-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                            >
                                Our Gallery <Play className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Top Experience Card */}
                    <div className='flex flex-col w-full md:w-1/2 gap-2'>
                        <span className='text-sm font-bold'>#3 Top Experience</span>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
                            {topExperiences.map((experience) => (
                                <Link href={`/experience/${experience.id}`} key={experience.id}>
                                    <Card className="overflow-hidden group rounded-xl">
                                        <div className="relative h-48 w-full">
                                            {loading ? (
                                                <Skeleton className="w-full h-full" />
                                            ) : (
                                                <Image
                                                    src={imageError[experience.id] ? '/default-image.png' : experience.imageUrls[0]}
                                                    alt={experience.title}
                                                    fill
                                                    className={`object-cover transition-transform group-hover:scale-105 rounded-xl ${imageError[experience.id] ? 'object-none bg-gray-100' : ''}`}
                                                    onError={() => handleImageError(experience.id)}
                                                />
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                                {experience.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                <span className='text-yellow-400'>★</span> {experience.rating} ({experience.total_reviews} reviews)
                                            </p>
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}