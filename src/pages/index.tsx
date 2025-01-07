import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/home/heroHome";
import PartnerLogos from "@/components/home/partnerLogos";
import DestinationCard from "@/components/home/destinationCard";
import HowItWorks from "@/components/home/howItWorks";

const destinations = [
  {
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2368&auto=format&fit=crop',
    title: 'Nusa Penida',
    location: 'Bali, Indonesia',
    price: 2100,
  },
  {
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2368&auto=format&fit=crop',
    title: 'Tokyo',
    location: 'Japan',
    price: 2300,
  },
  // Add more destinations...
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <PartnerLogos />

      {/* Exclusive Deals */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Exclusive deals just for you!</h2>
            <Button variant="ghost" className="text-orange-500">
              View More →
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <DestinationCard
                key={destination.title}
                {...destination}
              />
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />
    </div>
  );
}
