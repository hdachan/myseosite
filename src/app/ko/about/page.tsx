// app/about/page.tsx
export const metadata = {
  title: "DMZ 관광 소개",
  description: "DMZ 관광 서비스 소개 페이지.",
};

export default function AboutPage() {
  return (
    <main className="py-8">
      <h1 className="text-3xl font-bold">회사 소개</h1>
      <p className="mt-4">DMZ 관광은 서울 출발 DMZ 전문 여행사입니다.</p>
    </main>
  );
}
