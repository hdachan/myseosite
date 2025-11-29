// src/app/page.tsx
import Hero from "@/components/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "서울 출발 DMZ 투어 당일치기 | 최저가 예약, 제3터널+도라전망대",
  description:
    "서울에서 출발하는 가장 완벽한 DMZ 투어. 제3터널 입장 + 도라전망대 전망 + 점심 포함. 매일 출발, 한국어 가이드 동행, 실시간 예약 가능.",
  openGraph: {
    title: "서울 DMZ 투어 당일치기 | 제3터널+도라전망대 포함",
    description:
      "하루 만에 보는 분단의 현장. 서울 호텔 픽업+점심 포함, 2025년 최신 일정",
    images: [
      {
        url: "/og-dmz.jpg",
        width: 1200,
        height: 630,
        alt: "DMZ 제3터널 입구와 도라전망대에서 본 북한 전경",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "서울 DMZ 투어 당일치기",
    description: "제3터널 들어가고 북녘 땅 직접 보는 바로 그 투어!",
    images: ["/og-dmz.jpg"],
  },
};

export default function Home() {
  return (
    <>
      <Hero />

      <article className="max-w-4xl mx-auto py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-8">
          서울 출발 DMZ 투어 당일치기
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            왜 DMZ 투어를 해야 할까요?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            한국전쟁 이후 70년간 사람의 발길이 닿지 않아 세계에서 가장 잘 보존된
            비무장지대(DMZ). 제3침투터널을 직접 걸어보고, 도라전망대에서
            망원경으로 북한 마을과 개성공단을 바라보며, 분단의 현실을 생생하게
            느낄 수 있는 유일한 기회입니다.
          </p>
        </section>

        {/* 나머지 내용은 그대로 유지 */}
        {/* ... */}
      </article>
    </>
  );
}
