import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { TOUR_DETAIL_QUERY, TOUR_SLUGS_QUERY } from "@/sanity/lib/queries";
import { createClient } from "@supabase/supabase-js";
import PackageDetailClient from "./PackageDetailClient";

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
    description: tour.fullDescription
      ? tour.fullDescription.slice(0, 160)
      : tour.description,
    openGraph: {
      images: [tour.image],
    },
  };
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default async function PackageDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // 1. Sanity에서 상품 정보 먼저 가져옴 (여기에 진짜 ID인 _id가 들어있음)
  const tourData = await client.fetch(TOUR_DETAIL_QUERY, { slug });

  if (!tourData) {
    return notFound();
  }

  // 🚀 [수정 완료] 이제 Slug가 아니라 '진짜 ID(_id)'로 리뷰를 찾습니다.
  const { data: reviews } = await supabase
    .from("reviews")
    .select("id, author_name, rating, content, created_at")
    .eq("tour_id", tourData._id) // ✅ 여기가 핵심 변경사항입니다!
    .eq("is_approved", true)
    .order("created_at", { ascending: false });

  // 평균 평점 계산
  const totalReviews = reviews?.length || 0;
  const averageRating =
    totalReviews > 0
      ? reviews!.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews
      : 0;

  // 데이터 병합
  const tour = {
    ...tourData,
    id: tourData._id,
    images:
      tourData.images && tourData.images.length > 0
        ? tourData.images
        : [tourData.image],
    packageOptions: tourData.packageOptions || [],
    price: tourData.packageOptions?.[0]?.price || tourData.price || 0,

    reviewsData: reviews || [],
    averageRating: averageRating,
    totalReviews: totalReviews,
  };

  return <PackageDetailClient tour={tour} />;
}
