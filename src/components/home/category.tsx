'use client';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import CategoryCard from '../card/categoryCard';
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
        <section className="py-10 px-4 md:px-8 lg:px-12">
            <div className="max-w-7xl px-4 md:mx-auto">
                <div className="space-y-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="space-y-2">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                Category
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 max-w-5xl">
                                Come on, discover the iconic attractions around you! There are plenty of discounts waiting.
                            </p>
                        </div>
                    </div>

                    {/* Categories Carousel */}
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
                                {categories.slice(0, 5).map((category) => (
                                    <CarouselItem key={category.id} className="pl-1 md:basis-1/2 lg:basis-1/4">
                                        <CategoryCard
                                            key={category.id}
                                            category={category}
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2" />
                            <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2" />
                        </Carousel>
                    </div>
                </div>
            </div>
        </section>
    );
}