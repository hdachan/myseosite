"use client";

import React from "react";
import { hangameFont } from "@/lib/fonts";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface TourOverviewSectionProps {
  title?: string;
  description: any[];
}

// ✅ Portable Text 커스텀 컴포넌트
const myPortableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 last:mb-0 leading-relaxed text-gray-700">{children}</p>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-bold mt-6 mb-3 text-gray-900">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-base font-bold mt-4 mb-2 text-gray-800">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#4A7C7E] pl-4 my-4 italic text-gray-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-5 mb-4 space-y-1 text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-5 mb-4 space-y-1 text-gray-700">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <u className="underline">{children}</u>,
    link: ({ value, children }) => {
      return (
        <a
          href={value?.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    // ✅ 이미지 - 600px, 왼쪽 정렬
    image: ({ value }) => {
      if (!value?.asset) return null;

      const imageUrl = urlFor(value.asset).width(600).quality(90).url();

      return (
        <figure className="my-6">
          <div className="relative w-full max-w-[600px] h-auto rounded-lg overflow-hidden border border-gray-200">
            <Image
              src={imageUrl}
              alt={value.alt || "Tour image"}
              width={600}
              height={400}
              className="w-full h-auto object-cover"
              sizes="(max-width: 768px) 100vw, 600px"
              priority={false}
            />
          </div>
          {value.caption && (
            <figcaption className="text-sm text-gray-500 mt-3 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default function TourOverviewSection({
  title = "Tour Overview",
  description,
}: TourOverviewSectionProps) {
  return (
    <section className="bg-white p-6 md:p-8 rounded-[6px] border border-gray-200 shadow-sm">
      <div className="mb-4">
        <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#4A7C7E] font-bold mb-2">
          TOUR DESCRIPTION
        </p>

        <h2
          className={`${hangameFont.className} text-xl md:text-2xl font-bold text-gray-900 leading-tight`}
        >
          {title}
        </h2>
      </div>

      <div className="text-sm text-gray-700">
        {description ? (
          <PortableText
            value={description}
            components={myPortableTextComponents}
          />
        ) : (
          <p className="text-gray-400 italic">No description available.</p>
        )}
      </div>
    </section>
  );
}
