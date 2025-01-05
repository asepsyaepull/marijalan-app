'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function HeroSection() {
    return (
        <div className="relative w-full">
            {/* Hero Image */}
            <div className="relative h-[500px] md:h-[600px] w-full">
                <Image
                    src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2368&auto=format&fit=crop"
                    alt="Beautiful beach landscape"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-8 lg:px-16">
                <span className="text-[#FF5722] font-medium mb-2">#exploretheworld</span>
                <h1 className="text-4xl md:text-6xl font-bold text-white max-w-2xl leading-tight mb-4">
                    Let's Travel The Beautiful World Together
                </h1>
                <p className="text-white/80 max-w-xl mb-8">
                    We always make our customer happy by providing as many choices as possible
                </p>
                <div className="flex gap-4">
                    <Button className="bg-none text-white border-white hover:bg-white/20">
                        Explore More
                    </Button>
                    <Button className="bg-white/10 text-white border border-white hover:bg-white/20">
                        Our Gallery
                    </Button>
                </div>
            </div>
        </div>
    );
}