import Link from "next/link";
import TourCard from "@/components/TourCard";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { hangameFont } from "@/lib/fonts";

// ✅ [추가] 만들어두신 로딩 컴포넌트 불러오기
// (파일 위치가 components 폴더 안이라고 가정했습니다)
import FullScreenLoader from "@/components/FullScreenLoader";

// ✅ 서버 컴포넌트
export default async function TourPackagesSection() {
  // 1️⃣ Sanity 데이터 가져오기
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

  let favoriteTours = [];

  try {
    const sanityTours = await client.fetch(query);

    favoriteTours = sanityTours.map((tour: any) => ({
      ...tour,
      id: tour._id,
      image: tour.image || "",
      price: tour.price || 0,
      rating: tour.rating || 5.0,
      reviews: tour.reviews || 0,
      bookings: tour.bookings || "0+ booked",
      tags: tour.tags || [],
    }));
  } catch (error) {
    console.error("Sanity fetch error:", error);
  }

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

        {/* 그리드 레이아웃 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-4 sm:gap-x-6 sm:gap-y-10 min-h-[300px]">
          {favoriteTours.length > 0 ? (
            favoriteTours.map((tour: any) => (
              <div key={tour.id}>
                <TourCard tour={tour} />
              </div>
            ))
          ) : (
            <div className="col-span-1 sm:col-span-2 lg:col-span-4">
              <FullScreenLoader
                variant="section"
                message="Preparing the best tours for you..."
                subMessage="Please check back in a moment."
              />
            </div>
          )}
        </div>

        {/* 모바일용 버튼 */}
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
