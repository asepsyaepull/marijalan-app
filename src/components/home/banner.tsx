import React from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import useBanner from "@/hooks/useBanner"
import BannerCard from "../card/bannerCard"
import Autoplay from "embla-carousel-autoplay"


export function BannerSection() {
    const { data: banners } = useBanner();
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    return (
        <section className="relative p-4 md:py-10 max-w-7xl px-4 mx-auto">
            <Carousel
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent>
                    {banners.map((banner) => (
                        <CarouselItem key={banner.id} className="w-full md:w-1/2 lg:w-1/3">
                            <BannerCard banner={banner} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="absolute bottom-4 right-20 flex gap-0">
                    <CarouselPrevious className="relative h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm" />
                    <CarouselNext className="relative h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm" />
                </div>
            </Carousel>
        </section>
    );
}
