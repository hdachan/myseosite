import dynamic from "next/dynamic";

// 1. [LCP & SEO 핵심] 즉시 로딩되어야 하는 컴포넌트 (Static Import)
import HeroCarousel from "@/components/Main/HeroCarousel";
import WhyChooseUs from "@/components/Main/WhyChooseUs";

const TourPackagesSection = dynamic(
  () => import("@/components/Main/TourPackagesSection"),
);
const FeaturedTours = dynamic(() => import("@/components/Main/FeaturedTours"));
const PartnerSection = dynamic(
  () => import("@/components/Main/PartnerSection"),
);

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <WhyChooseUs />
      <TourPackagesSection />
      <FeaturedTours />
      <PartnerSection />
    </>
  );
}
