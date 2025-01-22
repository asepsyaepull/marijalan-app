import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import useBanner from "@/hooks/useBanner"
import BannerCard from "../card/bannerCard"

export function BannerSection() {
    const { data: banners, isLoading, error } = useBanner();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading banners</div>;

    return (
        <section className="relative p-4 md:py-8 max-w-7xl mx-auto">
            <Carousel
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
