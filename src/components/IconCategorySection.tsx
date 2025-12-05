"use client";

import { useState } from "react";

const categories = [
  {
    id: 1,
    icon: (
      <svg
        className="w-16 h-16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="9"
          r="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    imageSrc: null,
    title: "DISCOVER KOREA",
    link: "/discover",
  },
  {
    id: 2,
    icon: (
      <svg
        className="w-16 h-16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          d="M5 11l4-7 4 7M5 11h8M5 11l-2 8h10l-2-8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 8l3-5 3 5M14 8h6M14 8l-1.5 6h5l-1.5-6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    imageSrc: null,
    title: "BTS In the soop",
    link: "/bts-soop",
  },
  {
    id: 3,
    icon: (
      <svg
        className="w-16 h-16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    imageSrc: null,
    title: "DMZ TOURS",
    link: "/dmz-tours",
  },
  {
    id: 4,
    icon: (
      <svg
        className="w-16 h-16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="10" r="1" fill="currentColor" />
        <circle cx="15" cy="10" r="1" fill="currentColor" />
        <path
          d="M9 14s1 1 3 1 3-1 3-1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    imageSrc: null,
    title: "REQUEST",
    link: "/request",
  },
];

export default function IconCategorySection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => (window.location.href = category.link)}
              onMouseEnter={() => setHoveredId(category.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group"
            >
              {/* Card */}
              <div
                className={`
                  bg-gray-50 rounded-2xl p-8 
                  transition-all duration-300
                  ${
                    hoveredId === category.id
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 shadow-xl scale-105 -translate-y-2"
                      : "hover:bg-gray-100 hover:shadow-md"
                  }
                `}
              >
                {/* Icon/Image (애니메이션 제거됨) */}
                <div className="flex justify-center mb-4">
                  <div className="text-gray-700">
                    {category.imageSrc ? (
                      <img
                        src={category.imageSrc}
                        alt={category.title}
                        className="w-16 h-16 object-contain"
                      />
                    ) : (
                      category.icon
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3
                  className={`
                    text-center font-semibold text-sm
                    transition-colors duration-300
                    ${
                      hoveredId === category.id ? "text-white" : "text-gray-800"
                    }
                  `}
                >
                  {category.title}
                </h3>
              </div>

              {/* Accent Line */}
              <div
                className={`
                  h-1 mx-auto mt-2 rounded-full transition-all duration-300
                  ${
                    hoveredId === category.id
                      ? "w-full bg-gradient-to-r from-blue-500 to-purple-600"
                      : "w-0"
                  }
                `}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
