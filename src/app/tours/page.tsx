// app/tours/page.tsx

export const metadata = {
  title: "DMZ 투어 목록 | 서울 출발 투어",
  description:
    "서울 출발 DMZ 투어 상품 목록과 일정 안내. 오전/오후 투어 정보 제공.",
  alternates: {
    canonical: "https://mysite.com/tours",
  },
};

export const revalidate = 60; // 1분마다 페이지 갱신

export default function ToursPage() {
  const tours = [
    {
      id: "morning",
      slug: "dmz-morning-tour",
      name: "DMZ 오전 투어",
      summary: "오전 9시 출발, 안전한 가이드와 함께 DMZ 투어",
    },
    {
      id: "afternoon",
      slug: "dmz-afternoon-tour",
      name: "DMZ 오후 투어",
      summary: "오후 1시 출발, 관광객 맞춤 일정 제공",
    },
  ];

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">DMZ 투어 목록</h1>
      <p className="text-gray-600 mb-6">
        서울 출발 DMZ 투어 상품 전체 목록입니다. 원하는 시간대의 투어를
        선택하세요.
      </p>

      <ul className="space-y-6">
        {tours.map((tour) => (
          <li key={tour.id}>
            <a
              href={`/tours/${tour.slug}`}
              aria-label={`${tour.name} 상세 페이지로 이동`}
              className="text-blue-600 underline text-lg font-medium"
            >
              {tour.name} →
            </a>
            <p className="text-gray-500 mt-1">{tour.summary}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
