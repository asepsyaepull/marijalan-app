'use client';

import HeroSection from "@/components/home/heroHome";
import PartnerLogos from "@/components/home/partnerLogos";
import HowItWorks from "@/components/home/howItWorks";
import ExclusiveDeals from "@/components/home/exclusiveDeals";
import Category from "@/components/home/category";
import Experience from "@/components/home/experience";
import { BannerSection } from "@/components/home/banner";
import Layout from "@/components/layout";

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <PartnerLogos />
      <ExclusiveDeals />
      <Category />
      <Experience />
      <BannerSection />
      <HowItWorks />
    </Layout>
  );
}
