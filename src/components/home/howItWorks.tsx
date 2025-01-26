'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MapPin, Ticket, CreditCard, Compass, Play } from 'lucide-react';

const steps = [
    {
        number: '01',
        title: 'Explore Destination',
        description: 'Our expert tour guide knows the best about traveling they will guide you alltime',
        icon: MapPin,
    },
    {
        number: '02',
        title: 'Get Your Tickets',
        description: 'Ready to embark on your next adventure? Secure your spot with ease by getting your tickets through',
        icon: Ticket,
    },
    {
        number: '03',
        title: 'Confirm Your Payment',
        description: "You're just one step away from completing your booking. Finalize your reservation, please confirm your payment.",
        icon: CreditCard,
    },
    {
        number: '04',
        title: 'Explore New Horizons',
        description: 'Step beyond the ordinary and embark on a journey to explore new horizons! Our expertly curated.',
        icon: Compass,
    },
];

export default function HowItWorks() {
    return (
        <section className="relative py-10 px-4 md:px-12">
            <div className="max-w-7xl px-4 mx-auto">
                <div className="grid md:grid-cols-2 border border-gray-200 dark:border-gray-700 rounded-3xl overflow-hidden">
                    {/* Left Content */}
                    <div className="bg-white dark:bg-slate-900 py-10 px-10 space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                How it works?
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                Encapsulations the experience of travel that merges the serenity of natur wiiht the dynamism of city.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {steps.map((step) => {
                                const Icon = step.icon;
                                return (
                                    <div
                                        key={step.number}
                                        className="flex gap-4 p-6 rounded-xl bg-white/5 hover:bg-orange-500/10 dark:bg-gray-800/50 dark:hover:bg-gray-800/70 transition-colors"
                                    >
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                                                <Icon className="w-5 h-5 text-orange-500" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                                                {step.number} {step.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative h-[500px] md:h-auto rounded-r-3xl overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?q=80&w=2340&auto=format&fit=crop"
                            alt="Travel experience"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20" />

                        {/* Action Buttons */}
                        <div className="absolute top-6 right-6 flex gap-4">
                            <Button
                                size="icon"
                                variant="ghost"
                                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                            >
                                <Play className="w-5 h-5" />
                            </Button>
                            <Button
                                className="rounded-full bg-white hover:bg-white/90 text-gray-900"
                            >
                                Get Started
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}