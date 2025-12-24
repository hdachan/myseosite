import Image from "next/image";
import React from "react";

interface PageHeroProps {
  title: string;
  description?: string;
  imageSrc: string;
}

export default function PageHero({
  title,
  description,
  imageSrc,
}: PageHeroProps) {
  return (
    <header className="relative pb-32">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={title}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-700/80 via-red-800/80 to-red-900/80" />

      {/* Text Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-wide">
          {title}
        </h1>

        {description && (
          <p className="text-red-100 text-base md:text-lg max-w-2xl">
            {description}
          </p>
        )}
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-900 via-red-600 to-red-900" />
    </header>
  );
}
