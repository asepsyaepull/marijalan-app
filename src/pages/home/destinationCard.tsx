import Image from 'next/image';
import { Card } from '@/components/ui/card';

type DestinationCardProps = {
    image: string;
    title: string;
    location: string;
    price: number;
};

export default function DestinationCard({ image, title, location, price }: DestinationCardProps) {
    return (
        <Card className="group overflow-hidden">
            <div className="relative h-[200px] w-full">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                />
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{location}</p>
                <p className="text-orange-500 font-semibold mt-2">${price.toLocaleString()}</p>
            </div>
        </Card>
    );
}