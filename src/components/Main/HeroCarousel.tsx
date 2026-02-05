"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
// ❌ [삭제] 로컬 데이터 import 제거
// import { basicPackages as packageTours } from "@/app/package/packageData_OLD.ts";

// ✅ [추가] Sanity Client
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

import { hangameFont } from "@/lib/fonts";

function highlight(text: string, keyword: string) {
  if (!keyword || !text) return text; // text가 없을 경우 방어
  const regex = new RegExp(`(${keyword})`, "ig");
  return text.split(regex).map((part, i) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <span key={i} className="text-[#D97959] font-semibold">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export default function HeroCarousel() {
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);

  // ✅ Sanity에서 가져온 데이터를 담을 State
  const [tours, setTours] = useState<any[]>([]);

  // ✅ 1. 컴포넌트 로드 시 Sanity에서 투어 데이터 가져오기
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const query = groq`
          *[_type == "tour"] {
            _id,
            title,
            "slug": slug.current,
            location,
            "image": mainImage.asset->url,
            price,
            tags // 키워드 검색용
          }
        `;
        const data = await client.fetch(query);
        setTours(data);
      } catch (error) {
        console.error("Failed to fetch tours for search:", error);
      }
    };

    fetchTours();
  }, []);

  // ✅ 2. 검색 로직 (Sanity 데이터 기준)
  const results = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();

    return tours.filter((tour) => {
      // 제목 검색
      const matchTitle = tour.title?.toLowerCase().includes(q);
      // 위치 검색 (location이 없을 수도 있으니 체크)
      const matchLocation = tour.location?.toLowerCase().includes(q);
      // 태그(키워드) 검색
      const matchTags = tour.tags?.some((tag: string) =>
        tag.toLowerCase().includes(q),
      );

      return matchTitle || matchLocation || matchTags;
    });
  }, [searchQuery, tours]); // tours가 로드되면 다시 계산

  const handleSelect = (slug: string) => {
    setOpen(false);
    setSearchQuery("");
    router.push(`/package/${slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && results.length > 0) {
      handleSelect(results[0].slug);
    }
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden mt-16 md:mt-20">
      <div className="relative w-full h-[550px] sm:h-[650px] md:h-[750px]">
        {/* 1. 배경 이미지 */}
        <Image
          src="/images/main-hero-korea-tour.jpg"
          alt="Korea travel background"
          fill
          priority
          sizes="100vw"
          // object-center 대신 아래 클래스 추가
          className="object-cover object-[50%_75%]"
        />

        {/* 배경 그라디언트 */}
        <div className="absolute inset-0 z-10 pointer-events-none" />

        {/* 2. 메인 콘텐츠 */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center">
          <div className="relative max-w-5xl mx-auto mb-8 py-8">
            <h1
              className={`${hangameFont.className} text-white leading-tight relative z-10`}
            >
              <span className="flex flex-col items-center">
                <span className="font-bold text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-3 tracking-wide">
                  Seoul City Tour
                </span>
                <span className="font-normal text-xl sm:text-3xl md:text-4xl lg:text-5xl tracking-normal opacity-100">
                  Walks for You, Not Just the View
                </span>
              </span>
            </h1>
          </div>

          <div
            ref={wrapperRef}
            className="relative w-full max-w-md sm:max-w-lg mb-4 z-20"
          >
            {/* ✅ 검색창 컨테이너 */}
            <div className="flex bg-white rounded-[6px] overflow-hidden border border-gray-200">
              <div className="flex-1 flex items-center px-4 py-2.5">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setOpen(true);
                  }}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setOpen(true)}
                  placeholder="Where do you want to go?"
                  className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
                />
              </div>
              <button className="bg-[#4A7C7E] hover:bg-[#3D6566] px-5 transition">
                <span className="text-white font-semibold text-sm">Search</span>
              </button>
            </div>

            {/* ✅ 검색 결과 드롭다운 */}
            {open && searchQuery.trim() && (
              <div className="absolute z-50 mt-2 w-full bg-white rounded-[6px] border border-gray-200 max-h-[240px] overflow-y-auto overscroll-contain">
                {results.length === 0 ? (
                  <div className="px-4 py-6 text-sm text-gray-500 text-center">
                    No tours found
                  </div>
                ) : (
                  results.map((tour) => (
                    <button
                      key={tour._id || tour.slug} // _id가 없으면 slug 사용
                      onClick={() => handleSelect(tour.slug)}
                      className="w-full flex items-center gap-4 px-4 py-3 hover:bg-gray-50 text-left border-b border-gray-100 last:border-0"
                    >
                      {/* 썸네일 이미지 */}
                      <div className="relative w-16 h-16 rounded-[6px] overflow-hidden shrink-0 bg-gray-100">
                        {tour.image && (
                          <Image
                            src={tour.image}
                            alt={tour.title}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 line-clamp-1 mb-0.5">
                          {highlight(tour.title, searchQuery)}
                        </p>
                        <p className="text-xs text-gray-500 mb-0.5">
                          {highlight(tour.location || "", searchQuery)}
                        </p>
                        <p className="text-sm font-semibold text-[#4A7C7E]">
                          from ${tour.price || 0}
                        </p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}

            {/* Popular 키워드 섹션 */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 md:mt-6">
              <span
                className={`
                  ${hangameFont.className} 
                  text-white/100 font-normal uppercase tracking-wider
                  text-xs md:text-sm 
                  mr-2 md:mr-4
                `}
              >
                Popular:
              </span>
              {["DMZ", "JSA", "Drama", "ski"].map((keyword) => (
                <button
                  key={keyword}
                  onClick={() => {
                    setSearchQuery(keyword);
                    setOpen(true);
                  }}
                  className="
                    text-xs md:text-sm 
                    text-white font-medium 
                    px-3 py-[1px] md:px-5 
                    bg-[#4A7C7E] hover:bg-[#3D6566]
                    rounded-[6px] transition border border-white/10
                  "
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
            <div className="flex flex-col items-center gap-1 animate-bounce">
              <div className="w-5 h-8 rounded-full border border-white/60 flex justify-center p-1.5">
                <div className="w-1 h-1.5 bg-white rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
