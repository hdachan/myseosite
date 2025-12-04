// src/app/page.tsx

import HeroCarousel1 from "@/components/HeroCarousel1";

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
      {/* 1. 상단 기업체 전용 투어 캐러셀 (가로 스와이프) */}
      <HeroCarousel1 />
    </>
  );
}
