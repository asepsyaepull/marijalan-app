import Image from 'next/image';

const partners = [
    { name: 'Airbnb', logo: '/images/airbnb.svg' },
    { name: 'Booking.com', logo: '/images/booking-com.svg' },
    { name: 'Opendoor', logo: '/images/opendoor.svg' },
    { name: 'Tiket.com', logo: '/images/tiketcom.svg' },
    { name: 'Traveloka', logo: '/images/traveloka.svg' },
    { name: 'Klook', logo: '/images/klook.svg' },
];

export default function PartnerLogos() {
    return (
        <div className="py-10 dark:bg-gray-900">
            <div className="container mx-auto px-8">
                <div className="flex flex-wrap justify-between items-center md:px-20 gap-8 md:gap-24 overflow-x-auto scrollbar-hide">
                    {partners.map((partner) => (
                        <div key={partner.name} className="w-36 h-10 grayscale hover:grayscale-0 transition-all">
                            <Image
                                src={partner.logo}
                                alt={partner.name}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}