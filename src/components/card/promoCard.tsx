'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

export interface PromoItem {
    id: string;
    imageUrl: string;
    title: string;
    description: string;
    terms_condition: string;
    promo_code: string;
    promo_discount_price: number;
    minimum_claim_price: number;
    createdAt: string;
    updatedAt: string;
}

type PromoCardProps = {
    promo: PromoItem;
};

export default function PromoCard({ promo }: PromoCardProps) {
    return (
        <div className="relative group rounded-2xl overflow-hidden">
            {/* Background Image */}
            <div className="relative h-[200px] w-full">
                <Image
                    src={promo.imageUrl}
                    alt={promo.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                />
                {/* Gradient Overlay */}
                {/* <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" /> */}
            </div>

            {/* Content */}
            {/* <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div>
                    {promo.title && (
                        <span className="inline-block px-3 py-1 bg-white/90 rounded-full text-sm font-medium text-gray-900 mb-2">
                            {promo.title}
                        </span>
                    )}
                    <h3 className="text-xl font-bold text-white">
                        {promo.title}
                    </h3>
                    <p className="text-white/90 text-sm mt-1">
                        {promo.terms_condition}
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <span className="bg-white/80 px-3 py-1 rounded-full text-sm font-semibold text-orange-500">
                        Rp{promo.promo_discount_price}
                    </span>
                    <Button
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                    >
                        Book Now →
                    </Button>
                </div>
            </div> */}
        </div>
    );
}