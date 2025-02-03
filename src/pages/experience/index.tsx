'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import useExperience from '@/hooks/useActivity';
import ExperienceCard, { ExperienceType } from '@/components/card/experienceCard';
import Layout from '@/components/layout';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { CustomBreadcrumb } from '@/components/ui/custom-breadcrumb';
import { useBreadcrumb } from '@/hooks/useBreadcrumb';
import { Skeleton } from '@/components/ui/skeleton';

export default function ExperiencePage() {
    const { data: experiences, isLoading, error } = useExperience();
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const breadcrumbItems = useBreadcrumb();

    {/* Skeleton Loading */}
    if (isLoading) {
        return (
            <Layout>
                <section className="p-4 md:p-8 lg:p-10 space-y-4 md:space-y-8 lg:space-y-10">
                    <div className="max-w-7xl px-4 mx-auto">
                        <div className="space-y-8">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="space-y-2">
                                    <Skeleton className="h-8 w-48" />
                                    <Skeleton className="h-4 w-96" />
                                </div>
                                <div className="w-full md:max-w-md lg:max-w-lg mb-12">
                                    <Skeleton className="h-12 w-full" />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {[...Array(5)].map((_, index) => (
                                    <Skeleton key={index} className="h-10 w-24 rounded-full" />
                                ))}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {[...Array(8)].map((_, index) => (
                                    <Skeleton key={index} className="h-64 w-full" />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const searchExperience = (experiences: ExperienceType[]) => {
        return experiences.filter(
            (dest) =>
                dest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                dest.address.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const categories = ['All', ...new Set(experiences.map(exp => exp.category.name))];

    const filteredExperiences = activeCategory === 'All'
        ? searchExperience(experiences)
        : searchExperience(experiences).filter(exp => exp.category.name === activeCategory);

    return (
        <Layout>
            <section className="p-4 md:p-8 lg:p-10 space-y-4 md:space-y-8 lg:space-y-10">
                <CustomBreadcrumb items={breadcrumbItems} className="max-w-7xl px-4 md:mx-auto" />
                <div className="max-w-7xl px-4 mx-auto">
                    <div className="space-y-8">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="space-y-2">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                    Explore the world for relax!
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
                                    All-inclusive vacations and flights to the Caribbean, Indonesian, and more than 1,300 destinations worldwide. Now with Xplore Vacations.
                                </p>
                            </div>
                            {/* Search Bar */}
                            <div className="w-full md:max-w-md lg:max-w-lg mb-12">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                    <Input
                                        type="text"
                                        placeholder="Search Experience..."
                                        className="pl-10 h-12 w-full"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
        </Layout>
    );
}