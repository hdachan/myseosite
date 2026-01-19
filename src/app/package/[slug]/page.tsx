import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { TOUR_DETAIL_QUERY, TOUR_SLUGS_QUERY } from "@/sanity/lib/queries";
import PackageDetailClient from "./PackageDetailClient";

// ✅ 로컬 데이터 파일 import 삭제함! (순수 Sanity 모드)

// ISR 60초
export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const tours = await client.fetch(TOUR_SLUGS_QUERY);
  return tours.map((tour: any) => ({ slug: tour.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = await client.fetch(TOUR_DETAIL_QUERY, { slug });

  if (!tour) return { title: "Tour Not Found" };

  return {
    title: `${tour.title} | Korea Tour Package`,
    // Sanity 설명 사용
    description: tour.fullDescription
      ? tour.fullDescription.slice(0, 160)
      : tour.description,
    openGraph: {
      images: [tour.image],
    },
  };
}

export default async function PackageDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // 🚀 100% Sanity에서 모든 데이터 가져오기
  const tourData = await client.fetch(TOUR_DETAIL_QUERY, { slug });

  if (!tourData) {
    return notFound();
  }

  // 데이터 매핑 (Sanity -> Client 컴포넌트용)
  const tour = {
    ...tourData,
    id: tourData._id,

    // 갤러리 이미지가 있으면 쓰고, 없으면 메인 이미지 1장으로 대체
    images:
      tourData.images && tourData.images.length > 0
        ? tourData.images
        : [tourData.image],

    // 옵션 배열
    packageOptions: tourData.packageOptions || [],

    // 가격 안전 처리
    price: tourData.packageOptions?.[0]?.price || tourData.price || 0,
  };

  return <PackageDetailClient tour={tour} />;
}
