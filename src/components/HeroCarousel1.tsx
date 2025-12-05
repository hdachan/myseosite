"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function HeroCarousel1() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image - Next.js Image로 최적화 */}
      <Image
        src="/images/backgroud.jpg"
        fill
        priority
        quality={90}
        className="object-cover transition-transform duration-[20000ms] ease-linear hover:scale-110"
        alt="Authentic Korea hero background"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltZbUR4v1xS0jJ8A4y1pVyg0mX9i6yP8A/2Q=="
      />

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-purple-900/50 to-black/70 animate-pulse-slow"></div>

      {/* Content */}
      <div className="relative h-screen flex items-center justify-center px-4">
        <div className="text-center text-white max-w-5xl">
          {/* Main Heading with staggered animation */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10"
            }`}
          >
            <h1
              className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-[1.2]"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              Want to Experience
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent inline-block animate-gradient-x">
                Authentic Korea?
              </span>
            </h1>
          </div>

          {/* Subtitle with delayed animation */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <p className="text-lg md:text-2xl font-light text-white/95 mb-12 leading-relaxed tracking-wide">
              Discover extraordinary experiences
              <br className="hidden md:block" />
              <span className="text-cyan-300">
                for locals and travelers alike
              </span>
            </p>
          </div>

          {/* Search Bar with delayed animation */}
          <div
            className={`max-w-2xl mx-auto mb-16 transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative backdrop-blur-md bg-white/15 p-2 rounded-full border border-white/30 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02]">
              <input
                type="text"
                placeholder="Where do you want to explore today?"
                className="w-full px-6 py-4 rounded-full bg-white/95 text-gray-900 text-base font-medium focus:outline-none focus:ring-2 focus:ring-cyan-400 pr-16 shadow-xl placeholder:text-gray-500"
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white hover:from-cyan-600 hover:to-blue-700 transition-all shadow-xl hover:shadow-2xl transform hover:scale-110 active:scale-95"
                aria-label="Search"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Scroll Indicator with pulsing animation */}
          <div
            className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex flex-col items-center gap-2 animate-bounce">
              <span className="text-white/80 text-sm font-medium tracking-widest uppercase">
                Scroll
              </span>
              <svg
                className="w-6 h-6 text-white/70"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 3s ease infinite;
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.85;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
