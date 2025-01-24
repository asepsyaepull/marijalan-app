import Image from 'next/image';
import { cn } from "@/lib/utils";
import { Marquee } from '../ui/marquee';

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
    return (
        <section className="py-10 px-4 md:px-8 lg:px-12">
            <div className="container max-w-7xl mx-auto">
                <div className="flex flex-row items-center md:mx-auto gap-8 md:gap-40 overflow-x-auto scrollbar-hide">
                    <Marquee pauseOnHover className="[--duration:20s] [--gap:40px]">
                        {firstRow.map((partner) => (
                            <div key={partner.name} className="w-36 h-10 grayscale hover:grayscale-0 transition-all">
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