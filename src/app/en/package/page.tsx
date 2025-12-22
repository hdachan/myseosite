// D:\myseosite\src\app\en\package\page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  packageTours,
  getPackagesByCategory,
  type Category,
} from "./packageData";

export default function PackageTourPage() {
  const [category, setCategory] = useState<Category>("ALL");

  const filteredTours = getPackagesByCategory(category);

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Hero Section */}
      <div className="relative pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-red-700/80 via-red-800/80 to-red-900/80" />

        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 relative">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Group Activity Tours
          </h1>
          <p className="text-red-100 mt-3">
            Join a guided tour and experience the journey!
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-900 via-red-600 to-red-900" />
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-10 pb-16">
        <article className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-t-2 border-red-800">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-gray-600">
              <li>
                <Link href="/en" className="hover:text-red-600">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-red-600 font-semibold">Package Tours</li>
            </ol>
          </nav>

          {/* Category Filter */}
          <nav
            aria-label="Tour categories"
            className="flex flex-wrap gap-2 mb-8"
          >
            {[
              ["ALL", "All Tours"],
              ["DMZ", "DMZ Tour"],
              ["DAILY", "Daily Tour"],
              ["LOCAL", "Local Tour"],
              ["DRAMA", "Drama Tour"],
              ["SKI", "Ski Tour"],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setCategory(key as Category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition
                  ${
                    category === key
                      ? "bg-red-700 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                aria-pressed={category === key}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Tour Cards Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTours.map((tour) => (
              <article key={tour.id} className="group">
                <Link href={`/en/package/${tour.slug}`} className="block">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-[380px] flex flex-col">
                    <div className="relative h-[140px] overflow-hidden">
                      <Image
                        src={tour.image}
                        alt={`${tour.title} - Korea tour package`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {tour.discount && (
                        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-md">
                          {tour.discount}% OFF
                        </div>
                      )}
                    </div>

                    <div className="p-4 flex flex-col flex-1">
                      <div className="text-xs text-gray-500 mb-2">
                        {tour.location}
                      </div>

                      <h2 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 leading-snug">
                        {tour.title}
                      </h2>

                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                        {tour.description}
                      </p>

                      <div className="flex items-center gap-1 mb-3">
                        <span
                          className="text-yellow-500 text-sm"
                          aria-hidden="true"
                        >
                          ★
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                          {tour.rating}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({tour.reviews}) • {tour.bookings}
                        </span>
                      </div>

                      <div className="mt-auto">
                        {tour.discount ? (
                          <>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm text-gray-400 line-through">
                                $ {tour.originalPrice}
                              </span>
                              <span className="text-xs font-semibold text-red-600">
                                {tour.discount}% OFF
                              </span>
                            </div>
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-xl font-bold text-red-600">
                                $ {tour.price}
                              </span>
                              <span className="text-sm text-gray-600">
                                From
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xl font-bold text-gray-900">
                              $ {tour.price}
                            </span>
                            <span className="text-sm text-gray-600">From</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </section>
        </article>
      </div>
    </div>
  );
}
