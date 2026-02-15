import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { TOUR_DETAIL_QUERY, TOUR_SLUGS_QUERY } from "@/sanity/lib/queries";
import { createClient } from "@supabase/supabase-js";
import PackageDetailClient from "./PackageDetailClient";

// 1. ISR 설정 (60초마다 최신 데이터 확인)
export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 2. 정적 경로 생성 (빌드 시 페이지 미리 만들기)
export async function generateStaticParams() {
  const tours = await client.fetch(TOUR_SLUGS_QUERY);
  return tours.map((tour: any) => ({ slug: tour.slug }));
}

// 3. 동적 메타데이터 (SEO 핵심 1: 제목/설명/URL)
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = await client.fetch(TOUR_DETAIL_QUERY, { slug });

  if (!tour) return { title: "Tour Not Found" };

  const pageTitle = `${tour.title} | Seoul City Tour`;
  const pageDesc = tour.fullDescription
    ? tour.fullDescription.slice(0, 160) // 160자 제한 (구글 권장)
    : tour.description || "Book the best Seoul tours.";

  return {
    title: pageTitle,
    description: pageDesc,
    // ✅ [추가] Canonical URL (중복 문서 방지 필수!)
    alternates: {
      canonical: `https://myseosite.vercel.app/package/${slug}`,
    },
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      images: [tour.image], // 카톡 공유 시 나올 이미지
      type: "website",
    },
  };
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default async function PackageDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // 1. Sanity 데이터 가져오기
  const tourData = await client.fetch(TOUR_DETAIL_QUERY, { slug });

  if (!tourData) {
    return notFound();
  }

  // 2. Supabase 리뷰 가져오기 (실제 ID 기반)
  const { data: reviews } = await supabase
    .from("reviews")
    .select("id, author_name, rating, content, created_at")
    .eq("tour_id", tourData._id)
    .eq("is_approved", true)
    .order("created_at", { ascending: false });

  // 3. 평균 평점 & 리뷰 수 계산
  const totalReviews = reviews?.length || 0;
  const averageRating =
    totalReviews > 0
      ? reviews!.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews
      : 0; // 리뷰 없으면 0점

  // 4. 데이터 병합 - ✅ 안전한 배열 체크 추가
  const tour = {
    ...tourData,
    id: tourData._id,
    images:
      Array.isArray(tourData.images) && tourData.images.length > 0
        ? tourData.images
        : [tourData.image],
    packageOptions: Array.isArray(tourData.packageOptions)
      ? tourData.packageOptions
      : [],
    price: tourData.packageOptions?.[0]?.price || tourData.price || 0,
    reviewsData: Array.isArray(reviews) ? reviews : [],
    averageRating: averageRating,
    totalReviews: totalReviews,
  };

  // 🚀 [SEO 핵심 2] JSON-LD 구조화 데이터 생성 (이게 별점 띄우는 코드!)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: tour.title,
    image: [
      tour.image,
      ...(Array.isArray(tour.images) ? tour.images : []),
    ].filter(Boolean),
    description: tour.description,
    brand: {
      "@type": "Brand",
      name: "Seoul City Tour",
    },
    offers: {
      "@type": "Offer",
      url: `https://myseosite.vercel.app/package/${slug}`,
      priceCurrency: "KRW",
      price: tour.price, // 최저가 기준
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Seoul City Tour",
      },
    },
    // ✅ 리뷰가 있을 때만 별점 정보를 구글에 보냄 (없는데 보내면 에러 남)
    ...(totalReviews > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: averageRating.toFixed(1),
        reviewCount: totalReviews,
        bestRating: "5",
        worstRating: "1",
      },
    }),
  };

  return (
    <>
      {/* ✅ [봇 전용] JSON-LD 스크립트 심기 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 사용자 화면 */}
      <PackageDetailClient tour={tour} />
    </>
  );
}
