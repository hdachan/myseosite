import FeaturedTours from "@/components/Main/FeaturedTours";
import HeroCarousel from "@/components/Main/HeroCarousel";
import WhyChooseUs from "@/components/Main/WhyChooseUs";
import PartnerSection from "@/components/Main/PartnerSection";
import TourPackagesSection from "@/components/Main/TourPackagesSection";

export default function Home() {
  return (
    <>
      {/* 1. H1 태그가 포함된 Hero (SEO 점수 획득) */}
      <HeroCarousel />

      <WhyChooseUs />

      <TourPackagesSection />

      <FeaturedTours />

      <PartnerSection />
    </>
  );
}
