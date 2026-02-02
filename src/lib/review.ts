import { createClient } from "@supabase/supabase-js";

// ✅ Supabase 클라이언트 설정
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

/**
 * Sanity에서 가져온 데이터 리스트에 Supabase 리뷰 점수만 합쳐주는 함수
 */
export async function mergeReviews(toursData: any) {
  try {
    if (!toursData) return toursData;

    // 데이터가 배열인지 단일 객체인지 확인
    const isArray = Array.isArray(toursData);
    const toursList = isArray ? toursData : [toursData];

    // 1. Supabase에서 승인된 모든 리뷰 데이터 가져오기 (리뷰만 딱 가져옴!)
    const { data: allReviews, error } = await supabase
      .from("reviews")
      .select("tour_id, rating")
      .eq("is_approved", true);

    if (error) throw error;

    // 2. 리뷰 데이터 병합
    const merged = toursList.map((tour: any) => {
      // 투어 _id와 일치하는 리뷰들만 필터링
      const productReviews =
        allReviews?.filter((r) => r.tour_id === tour._id) || [];
      const totalReviews = productReviews.length;

      const averageRating =
        totalReviews > 0
          ? productReviews.reduce((acc, curr) => acc + curr.rating, 0) /
            totalReviews
          : 0;

      return {
        ...tour,
        // ✅ 이미지나 다른 정보는 건드리지 않고, 평점 정보만 추가/업데이트
        averageRating,
        totalReviews,
      };
    });

    return isArray ? merged : merged[0];
  } catch (err) {
    console.error("리뷰 데이터 병합 에러:", err);
    return toursData; // 에러 나면 원본이라도 반환
  }
}
