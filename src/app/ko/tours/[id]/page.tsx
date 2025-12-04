// app/tours/[id]/page.tsx

interface Props {
  params: { id: string };
}

// 가능한 투어 ID 타입 정의
type TourId = "morning" | "afternoon";

// 투어 데이터 정의
const tourData: Record<TourId, { title: string; desc: string; price: number }> =
  {
    morning: {
      title: "DMZ 오전 투어",
      desc: "오전 출발 DMZ 투어, 안전한 가이드와 함께 즐기는 DMZ 여행",
      price: 65000,
    },
    afternoon: {
      title: "DMZ 오후 투어",
      desc: "오후 출발 DMZ 투어, 관광객 맞춤 일정 제공",
      price: 70000,
    },
  };

// generateMetadata: 동적 메타 정보 생성
export function generateMetadata({ params }: Props) {
  const id = params.id as TourId;

  if (!tourData[id]) {
    return {
      title: "투어 정보 없음 | DMZ 투어",
      description: "존재하지 않는 투어입니다.",
    };
  }

  const tour = tourData[id];

  return {
    title: `${tour.title} | DMZ 투어`,
    description: tour.desc,
    alternates: { canonical: `https://mysite.com/tours/${id}` },
  };
}

// 페이지 컴포넌트
export default function TourDetail({ params }: Props) {
  const id = params.id as TourId;

  if (!tourData[id]) {
    return (
      <p className="max-w-4xl mx-auto py-10 px-4 text-red-600">
        존재하지 않는 투어입니다.
      </p>
    );
  }

  const tour = tourData[id];

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      {/* H1: 페이지 주제 */}
      <h1 className="text-3xl font-bold mb-4">{tour.title}</h1>

      {/* 간단한 설명 */}
      <p className="text-gray-700 mb-2">{tour.desc}</p>
      <p className="text-gray-900 font-semibold mb-4">
        가격: {tour.price.toLocaleString()}원
      </p>

      {/* JSON-LD 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            name: tour.title,
            description: tour.desc,
            offers: {
              "@type": "Offer",
              price: tour.price,
              priceCurrency: "KRW",
              url: `https://mysite.com/tours/${id}`,
            },
          }),
        }}
      />

      {/* 내부 링크 */}
      <a
        href="/tours"
        className="mt-6 inline-block text-blue-600 underline"
        aria-label="투어 목록 페이지로 이동"
      >
        ← 투어 목록으로 돌아가기
      </a>
    </main>
  );
}
