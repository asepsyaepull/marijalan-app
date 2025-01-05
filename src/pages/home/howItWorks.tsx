import { MapPin, Ticket, CreditCard, Compass } from 'lucide-react';
import Image from 'next/image';

const steps = [
    {
        number: '01',
        title: 'Explore Destination',
        description: 'Our expert tour guides knows the best about traveling they will guide you around',
        icon: MapPin,
    },
    {
        number: '02',
        title: 'Get Your Tickets',
        description: 'Ready to embark on your next adventure? Secure your spot with ease by booking your ticket through',
        icon: Ticket,
    },
    {
        number: '03',
        title: 'Confirm Your Payment',
        description: 'We\'ll guide you step by step from completing your booking. Finalize your reservation with our secure payment system',
        icon: CreditCard,
    },
    {
        number: '04',
        title: 'Explore New Horizons',
        description: 'Get ready! Your dream destination awaits as you prepare to explore new horizons! Our expertly curated',
        icon: Compass,
    },
];

export default function HowItWorks() {
    return (
        <div className="relative py-16 bg-gray-900 text-white">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold">How it works?</h2>
                            <p className="text-gray-400">
                                To experience the experience of travel that merges the serenity of value with the dynamism of city.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {steps.map((step) => {
                                const Icon = step.icon;
                                return (
                                    <div key={step.number} className="flex gap-4 p-4 rounded-lg bg-white/5">
                                        <Icon className="w-6 h-6 text-orange-500" />
                                        <div>
                                            <h3 className="font-semibold mb-2">
                                                {step.number} {step.title}
                                            </h3>
                                            <p className="text-sm text-gray-400">{step.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="relative h-[600px]">
                        <Image
                            src="https://s3-alpha-sig.figma.com/img/2c9d/b4cf/657d1ad5e340a661f31259f7e6904bfd?Expires=1736726400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YbX0cJ77TugYMcB4UBabzchSkg5u7LuLUo6bicn-BmNsE9aqILZjgNxLekQ9aO5QDEZEg3vUwLNYAz38jZbTxJIn5rirmTKze79pNpDQKp0HGToOIlVlToH-UjdkiEKPRB73n26xAVMSpzHwUApJdZtkPcBZ7SZ9AIDvwaSGsqg~MIHDd41gkk93bkre5J2KhwIQHjfeAsVzq8~SN634mNm9UahEy~QiRvsEVA8msLteHHa-KHqgxiYOEmJeYR7jgBZRF4hOYJxi-5NHDkvJw20zz8SU3xuVDCO6~3OTq4HNzTrY39Yhd6xXF64221AsH~imbnKGdFM7X74YdP9Log__"
                            alt="Travel experience"
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}