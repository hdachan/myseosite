import Link from "next/link";
import TourCard from "@/components/TourCard";
import { client } from "@/sanity/lib/client"; // ✅ Sanity Client 가져오기
import { groq } from "next-sanity"; // ✅ 쿼리 작성을 위해 필요
import { hangameFont } from "@/lib/fonts";

// ✅ 서버 컴포넌트로 변경 (async 추가)
export default async function TourPackagesSection() {
  // 1️⃣ Sanity에서 "Top 4" 투어 가져오기
  // (평점이 높은 순, 혹은 최신순으로 4개만 가져옵니다)
  const query = groq`
    *[_type == "tour"] | order(rating desc)[0...4] {
      _id,
      title,
      "slug": slug.current,
      "image": mainImage.asset->url,
      category,
      price,
      originalPrice,
      discount,
      rating,
      reviews,
      bookings,
      tags
    }
  `;

  const sanityTours = await client.fetch(query);

  // 2️⃣ 데이터 매핑 (Sanity 데이터 -> TourCard용)
  const favoriteTours = sanityTours.map((tour: any) => ({
    ...tour,
    id: tour._id, // TourCard는 id를 쓰므로 _id를 id로 매핑
    image: tour.image || "",
    price: tour.price || 0,
    rating: tour.rating || 5.0,
    reviews: tour.reviews || 0,
    bookings: tour.bookings || "0+ booked",
    tags: tour.tags || [],
  }));

  return (
    <section className="w-full py-12 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        {/* 헤더 영역 */}
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <h2
            className={`${hangameFont.className} text-xl md:text-2xl font-bold text-gray-900 leading-tight`}
          >
            Top Picks by Seoul City Tour
          </h2>

          {/* PC용 See all 링크 */}
          <Link
            href="/package"
            className={`${hangameFont.className} hidden sm:flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-[#ad3928] transition-colors pb-1`}
          >
            See all
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>

        {/* 그리드 레이아웃 (Sanity 데이터 렌더링) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-4 sm:gap-x-6 sm:gap-y-10">
          {favoriteTours.length > 0 ? (
            favoriteTours.map((tour: any) => (
              <div key={tour.id}>
                <TourCard tour={tour} />
              </div>
            ))
          ) : (
            // 데이터가 없을 때 표시할 내용 (선택사항)
            <div className="col-span-4 text-center text-gray-500 py-10">
              Loading tours...
            </div>
          )}
        </div>

        {/* 모바일용 View all tours 버튼 */}
        <div className="mt-8 sm:hidden text-center">
          <Link
            href="/package"
            className={`${hangameFont.className} inline-block px-6 py-3 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors`}
          >
            View all tours
          </Link>
        </div>
      </div>
    </section>
  );
}
