// components/Hero.tsx
import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full py-20 bg-gray-50 text-center">
      {/* 히어로 이미지는 next/image + priority → SEO & LCP 최적 */}
      <div className="max-w-5xl mx-auto">
        <Image
          src="/images/dmz.webp"
          alt="서울 출발 DMZ 관광 이미지"
          width={1200}
          height={600}
          priority
          className="rounded-2xl shadow-md mx-auto"
        />

        {/* SEO가 좋아하는 시멘틱 구조 (h1 → p → a 순서) */}
        <h1 className="text-4xl font-bold mt-10">서울 출발 DMZ 관광</h1>

        <p className="mt-4 text-lg text-gray-700">
          안전하고 전문적인 DMZ 투어 — 일정, 가격, 예약 정보를 한눈에
          확인하세요.
        </p>

        {/* CTA는 시멘틱적으로 button/anchor가 최적 */}
        <a
          href="/tours"
          className="inline-block mt-8 px-10 py-4 bg-blue-600 text-white rounded-xl text-lg font-medium hover:bg-blue-700 transition"
        >
          DMZ 투어 예약하기
        </a>
      </div>
    </section>
  );
}
