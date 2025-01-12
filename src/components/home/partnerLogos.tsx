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
        <section className="py-8 px-4 md:px-10">
            <div className="container max-w-7xl mx-auto">
                <div className="flex flex-wrap justify-between items-center md:mx-auto gap-8 md:gap-20 overflow-x-auto scrollbar-hide">
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
        </section>
    );
}