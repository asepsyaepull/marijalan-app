'use client';

import React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Skeleton } from '@/components/ui/skeleton';
import useBanner from '@/hooks/useBanner';
import BannerCard from '../card/bannerCard';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

export function BannerSection() {
    const { data: banners, isLoading, error } = useBanner();
    const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

    if (isLoading) {
        return (
            <section className="relative p-4 md:py-10 max-w-7xl px-4 mx-auto">
                <Skeleton className="w-full h-64" />
            </section>
        );
    }

    if (error) {
        return <p className="text-red-500">Failed to load banners</p>;
    }

    return (
        <section className="relative p-4 md:py-10 max-w-7xl px-4 mx-auto">
            <div className="relative w-full h-fit">
                {banners.length > 0 ? (
                  <Carousel
                      plugins={[plugin.current]}
                      className="w-full"
                      onMouseEnter={plugin.current.stop}
                      onMouseLeave={plugin.current.reset}
                  >
                      <CarouselContent className="flex gap-2 md:gap-4 px-4 justify-center">
                          {banners.map((banner, index) => (
                              <CarouselItem key={index} className="pl-1">
                                  <BannerCard banner={banner} />
                              </CarouselItem>
                          ))}
                      </CarouselContent>
                      <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full" />
                      <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full" />
                  </Carousel>
              ) : (
                  <Skeleton className="w-full h-64" />
              )}
          </div>
      </section>
  );
}
