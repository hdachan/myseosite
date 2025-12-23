import { getPackagesByCategory } from "../packageData";
import TourLayout from "@/components/TourLayout";

const tours = getPackagesByCategory("SKI");

export const metadata = {
  title: "Korea Ski Tours 2025 | Best Ski Resorts from Seoul",
  description:
    "Top ski & snowboard day trips from Seoul: Yongpyong, Alpensia, High1 Resort. Shuttle, lift pass included.",
  alternates: { canonical: "https://yourdomain.com/en/package/ski" },
};

export default function SkiToursPage() {
  return (
    <TourLayout
      tours={tours}
      currentCategory="SKI"
      heroTitle="Korea Ski & Snowboard Tours"
      heroSubtitle="Best winter ski resorts day trips from Seoul"
    />
  );
}
