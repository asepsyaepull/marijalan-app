'use client';

import CategoryCard, {CategoryType} from '../card/categoryCard';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

const categories: CategoryType[] = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2940&auto=format&fit=crop',
        country: 'UAE',
        flag: '🇦🇪',
        description: 'Experience the future in Dubai with its stunning architecture and luxury experiences.',
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2849&auto=format&fit=crop',
        country: 'Singapore',
        flag: '🇸🇬',
        description: 'Discover the perfect blend of nature and modernity in the Lion City.',
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?q=80&w=2940&auto=format&fit=crop',
        country: 'New York',
        flag: '🇺🇸',
        description: 'The city that never sleeps offers endless possibilities for adventure and culture.',
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?q=80&w=2940&auto=format&fit=crop',
        country: 'Toronto',
        flag: '🇨🇦',
        description: 'When it comes to planning a dream vacation, some destinations stand out as top recommendations for travelers worldwide.',
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2940&auto=format&fit=crop',
        country: 'UAE',
        flag: '🇦🇪',
        description: 'Experience the future in Dubai with its stunning architecture and luxury experiences.',
    },
];

export default function Category() {
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
                                    <CarouselItem key={category.id} className="basis-1/3 md:basis-1/4">
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