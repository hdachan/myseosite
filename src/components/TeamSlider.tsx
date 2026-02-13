"use client";

import Image from "next/image";
import { useRef } from "react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface TeamSliderProps {
  teamMembers: TeamMember[];
}

export default function TeamSlider({ teamMembers }: TeamSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      const cardWidth =
        sliderRef.current.querySelector("div")?.offsetWidth || 0;
      const gap = 24; // gap-6 = 24px
      sliderRef.current.scrollBy({
        left: -(cardWidth + gap),
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const cardWidth =
        sliderRef.current.querySelector("div")?.offsetWidth || 0;
      const gap = 24; // gap-6 = 24px
      sliderRef.current.scrollBy({
        left: cardWidth + gap,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {/* 화살표 버튼 (PC만) */}
      <button
        onClick={scrollLeft}
        className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 w-10 h-10 items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors border border-gray-200"
        aria-label="Previous"
      >
        <svg
          className="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={scrollRight}
        className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 w-10 h-10 items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors border border-gray-200"
        aria-label="Next"
      >
        <svg
          className="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* 슬라이더 */}
      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
      >
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="min-w-[260px] flex-shrink-0 snap-start lg:min-w-[calc(25%-18px)] bg-white rounded-[6px] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
          >
            <div className="relative h-64 bg-gray-200">
              <Image
                src={member.image}
                alt={`${member.name} - ${member.role}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 20vw"
              />
            </div>
            <div className="p-5">
              <h3 className="text-base font-bold text-gray-900">
                {member.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
