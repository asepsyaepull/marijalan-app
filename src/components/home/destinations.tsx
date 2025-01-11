'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import DestinationCard, { DestinationType } from '../card/destinationCard';

const destinations: DestinationType[] = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2938&auto=format&fit=crop',
        title: 'Bali',
        location: 'Greece (Santorini and Crete)',
        price: 2100,
        category: 'Indonesia',
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2864&auto=format&fit=crop',
        title: 'Malaysia',
        location: 'Greece (Santorini and Crete)',
        price: 2100,
        category: 'Malaysia',
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2940&auto=format&fit=crop',
        title: 'Swiss',
        location: 'Greece (Santorini and Crete)',
        price: 2100,
        category: 'France',
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2865&auto=format&fit=crop',
        title: 'Maldives',
        location: 'Greece (Santorini and Crete)',
        price: 2100,
        category: 'Camp',
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2946&auto=format&fit=crop',
        title: 'Paris',
        location: 'Greece (Santorini and Crete)',
        price: 2100,
        category: 'France',
    },
    {
        id: 6,
        image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?q=80&w=2942&auto=format&fit=crop',
        title: 'Seoul',
        location: 'Greece (Santorini and Crete)',
        price: 2100,
        category: 'Japan',
    },
    {
        id: 7,
        image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2940&auto=format&fit=crop',
        title: 'Sydney',
        location: 'Greece (Santorini and Crete)',
        price: 2100,
        category: 'Australia',
    },
    {
        id: 8,
        image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=2940&auto=format&fit=crop',
        title: 'Tokyo',
        location: 'Greece (Santorini and Crete)',
        price: 2100,
        category: 'Japan',
    },
];

const categories = ['All', 'Indonesia', 'Malaysia', 'France', 'Australia', 'Japan', 'Camp'];

export default function Destinations() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredDestinations = activeCategory === 'All'
        ? destinations
        : destinations.filter(dest => dest.category === activeCategory);

    return (
        <section className="py-16 px-4 md:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="space-y-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Explore the world for relax!
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
                                All-inclusive vacations and flights to the Caribbean, Indonesian, and more than 1,300 destinations worldwide. Now with Xplore Vacations.
                            </p>
                        </div>
                        <Button variant="ghost">
                            View More →
                        </Button>
                    </div>

                    {/* Categories */}
                    <div className="flex flex-wrap gap-3">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={activeCategory === category ? 'default' : 'outline'}
                                className={`rounded-full ${activeCategory === category
                                    ? 'bg-orange-500 hover:bg-orange-500/90 text-white'
                                    : 'hover:bg-orange-500/10 hover:text-orange-500'
                                    }`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>

                    {/* Destinations Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredDestinations.map((destination) => (
                            <DestinationCard
                                key={destination.id}
                                destination={destination}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}