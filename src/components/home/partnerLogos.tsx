import Image from 'next/image';
import { Marquee } from '../ui/marquee';
import { Skeleton } from '@/components/ui/skeleton';

const partners = [
    { name: 'Airbnb', logo: '/images/airbnb.svg' },
    { name: 'Booking.com', logo: '/images/booking-com.svg' },
    { name: 'Opendoor', logo: '/images/opendoor.svg' },
    { name: 'Tiket.com', logo: '/images/tiketcom.svg' },
    { name: 'Traveloka', logo: '/images/traveloka.svg' },
    { name: 'Klook', logo: '/images/klook.svg' },
];

const firstRow = partners.slice(0, partners.length);

export default function PartnerLogos() {
    const isLoading = false;

    if (isLoading) {
        return (
            <section className="py-10 px-4 md:px-8 lg:px-12">
                <div className="container max-w-7xl mx-auto">
                    <Skeleton className="w-full h-10" />
                </div>
            </section>
        );
    }

    return (
        <section className="py-10 px-4 md:px-8 lg:px-12">
            <div className="container max-w-7xl mx-auto">
                <div className="flex flex-row items-center gap-8 md:gap-40 overflow-x-auto scrollbar-hide">
                    <Marquee pauseOnHover className="[--duration:20s] [--gap:40px]">
                        {firstRow.map((partner) => (
                            <div key={partner.name} className="w-24 h-8 md:w-36 md:h-10 grayscale hover:grayscale-0 transition-all">
                                <Image
                                    src={partner.logo}
                                    alt={partner.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        ))}
                    </Marquee>
                </div>
            </div>
        </section>
    );
}