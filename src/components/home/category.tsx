'use client';

import CategoryCard from '../card/categoryCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import useCategory from '@/hooks/useCategory';

export default function Category() {
    const { data: categories, isLoading, error } = useCategory();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className="py-16 px-4 md:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="space-y-8">
                    {/* Header */}
                    <div className="space-y-4">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                            Category
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
                            Come on, discover the iconic attractions around you! There are plenty of discounts waiting.
                        </p>
                    </div>

                    {/* Recommendations Grid */}
                    <div className="grid grid-cols-1 gap-6">
                        <Carousel
                            opts={{
                                align: "start",
                            }}
                            className="w-full"
                        >
                            <CarouselContent>
                                {categories.map((category) => (
                                    <CarouselItem key={category.id} className="basis-1/3 md:basis-1/5">
                                        <div className="p-1">
                                            <CategoryCard
                                                key={category.id}
                                                category={category}
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                </div>
            </div>
        </section>
    );
}