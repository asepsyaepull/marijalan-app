'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import useExperience from '@/hooks/useExperience';
import ExperienceCard from '@/components/card/experienceCard';
import { BreadcrumbExperience } from './BreadcrumbExperience';

export default function ExperiencePage() {
    const { data: experiences, isLoading, error } = useExperience();
    const [activeCategory, setActiveCategory] = useState('All');

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
        <section className="px-4 md:px-8 lg:px-12">
            <BreadcrumbExperience />
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

                    {/* Experiences Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {filteredExperiences.map((experience) => (
                            <ExperienceCard
                                key={experience.id}
                                experience={experience}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}