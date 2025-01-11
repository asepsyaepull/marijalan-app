import Navbar from "@/components/navbar";
import HeroSection from "@/components/home/heroHome";
import PartnerLogos from "@/components/home/partnerLogos";
import HowItWorks from "@/components/home/howItWorks";
import ExclusiveDeals from "@/components/home/exclusiveDeals";
import Destinations from "@/components/home/destinations";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <PartnerLogos />
      <ExclusiveDeals />
      <Destinations />
      <HowItWorks />
    </div>
  );
}
