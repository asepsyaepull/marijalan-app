'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { Card } from '../ui/card';

const featuredDestinations = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21',
        title: 'New York City',
        subtitle: 'Highlights',
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1602940659805-770d1b3b9911',
        title: 'New York City',
        subtitle: 'Highlights',
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21',
        title: 'New York City',
        subtitle: 'Highlights',
    },
];

export default function HeroSection() {
    return (
        <section className="relative px-4 md:px-14 py-8">
            {/* Main Hero */}
            <div className="relative w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2368&auto=format&fit=crop"
                    alt="Tropical paradise"
                    fill
                    priority
                    className="object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                {/* Hero Content */}
                <div className="absolute bottom-4 p-8 md:px-10">
                    <div className="max-w-4xl space-y-4">
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
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8 p-4 md:px-10">
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

                    {/* Featured Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full md:w-1/2">
                        {featuredDestinations.map((destination) => (
                            <Card
                                key={destination.id}
                                className="overflow-hidden group rounded-xl"
                            >
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={destination.image}
                                        alt={destination.title}
                                        fill
                                        className="object-cover transition-transform group-hover:scale-105 rounded-xl"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                        {destination.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        {destination.subtitle}
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}