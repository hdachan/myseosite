"use client";

import Link from "next/link";

export default function CategorySection() {
  const categories = [
    {
      id: 1,
      title: "DISCOVER KOREA",
      icon: "/temp-icon.png",
      href: "/discover-korea",
    },
    {
      id: 2,
      title: "BTS In the soop",
      icon: "/temp-icon.png",
      href: "/bts-soop",
    },
    { id: 3, title: "DMZ TOURS", icon: "/temp-icon.png", href: "/dmz" },
    { id: 4, title: "REQUEST", icon: "/temp-icon.png", href: "/request" },
  ];

  return (
    <section className="w-full py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* PC: 그대로 flex + gap-75px, 모바일: 자동 줄바꿈 + 가운데 정렬 */}
        <div className="flex flex-wrap justify-center gap-[75px] md:flex-nowrap">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="flex flex-col items-center group"
            >
              <div className="w-[150px] h-[150px] rounded-2xl bg-gray-100 flex items-center justify-center shadow-sm transition-all duration-200 group-hover:scale-105">
                <img
                  src={cat.icon}
                  alt={cat.title}
                  className="w-[70px] h-[70px] opacity-80 group-hover:opacity-100 transition"
                />
              </div>

              <p className="mt-4 text-center font-medium tracking-wide text-gray-700 group-hover:text-black">
                {cat.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
