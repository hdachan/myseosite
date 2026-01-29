import FeaturedAccommodations from "@/components/FeaturedAccommodations";
import HeroCarousel from "@/components/HeroCarousel";
import WhyChooseUs from "@/components/WhyChooseUs";
import PartnerSection from "@/components/PartnerSection";
import TourPackagesSection from "@/components/TourPackagesSection";

export default function Home() {
  return (
    <>
      {/* 1. H1 태그가 포함된 Hero (SEO 점수 획득) */}
      <HeroCarousel />

      <WhyChooseUs />

      {/* 4. Main tour packages */}
      <TourPackagesSection />

      {/* 3. Featured accommodations / partners */}
      <FeaturedAccommodations />

      {/* 5. Global customer reviews */}
      {/* <GlobalReviewsSection /> */}

      {/* 2. Partner Section (Global Network) */}
      <PartnerSection />
    </>
  );
}
