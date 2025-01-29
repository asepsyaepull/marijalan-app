'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import ExperienceCard from '../card/experienceCard';
import useExperience from '@/hooks/useExperience';
import { useRouter } from 'next/router';

export default function Experience() {
    const { data: experiences, isLoading, error } = useExperience();
    const [activeCategory, setActiveCategory] = useState('All');
    const router = useRouter();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const categories = ['All', ...new Set(experiences.map(exp => exp.category.name))];

    const filteredExperiences = activeCategory === 'All'
        ? experiences
        : experiences.filter(exp => exp.category.name === activeCategory);

    return (
        <section className="py-10 px-4 md:px-8 lg:px-12">
            <div className="max-w-7xl px-4 md:mx-auto">
                <div className="space-y-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="space-y-2">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                Explore the world for relax!
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 max-w-5xl">
                                All-inclusive vacations and flights to the Caribbean, Indonesian, and more than 1,300 destinations worldwide. Now with Xplore Vacations.
                            </p>
                        </div>
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

                    {/* Experiences Carousel */}
                    <div className="relative">
                        <Carousel
                            opts={{
                                align: "start",
                                containScroll: "trimSnaps",
                                slidesToScroll: 1,
                            }}
                            className="w-full"
                        >
                            <CarouselContent className="flex gap-2 md:gap-4 px-4">
                                {filteredExperiences.slice(0, 5).map((experience) => (
                                    <CarouselItem key={experience.id} className="pl-1 md:basis-1/2 lg:basis-1/4">
                                        <ExperienceCard
                                            key={experience.id}
                                            experience={experience}
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2" />
                            <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2" />
                        </Carousel>
                    </div>

                    <div className="flex justify-center items-center">
                        <Button
                            variant="default"
                            className="rounded-lg w-40 md:w-52 bg-orange-50 text-orange-500 hover:bg-orange-500 hover:text-white"
                            onClick={() => router.push('/experience')}
                        >
                            Explore More →
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}