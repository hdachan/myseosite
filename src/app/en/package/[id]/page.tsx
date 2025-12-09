// src/app/en/package/[id]/page.tsx

import React from "react";
import {
  Star,
  Heart,
  Share2,
  MapPin,
  Clock,
  Users,
  Calendar,
  Award,
} from "lucide-react";

const packageTours = [
  {
    id: 1,
    title: "DMZ Tour - The 3rd Infiltration Tunnel Tour",
    image:
      "https://images.unsplash.com/photo-1583562835057-a62d1beffbf3?w=800&h=600&fit=crop",
    rating: 4.5,
    reviews: 1287,
    tags: ["DMZ", "History", "Full Day", "Guided Tour"],
    tourName: "DMZ Full Day Experience",
    minimumPax: 1,
    duration: "7 hours",
    timeRequired: "08:00-15:00",
    originalPrice: 70000,
    discount: 10,
    price: 63000,
    description:
      "임진각 평화누리 공원, 자유의 다리, 제3땅굴, DMZ 영상관/전시실, 도라전망대를 방문하는 투어입니다. 한국전쟁의 역사와 분단의 현실을 직접 체험할 수 있는 특별한 경험을 제공합니다.",
    highlights: [
      "제3땅굴 직접 탐험",
      "도라전망대에서 북한 바라보기",
      "DMZ 전문 가이드 동행",
      "호텔 픽업/드롭 포함",
    ],
    includes: ["전문 가이드", "입장료", "왕복 교통편", "점심 식사"],
  },
  {
    id: 2,
    title: "Nami Island + Petite France Private Tour",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    rating: 4.9,
    reviews: 2156,
    tags: ["Nami Island", "Petite France", "K-Drama", "Private"],
    tourName: "Winter Sonata Location Tour",
    minimumPax: 2,
    duration: "10 hours",
    timeRequired: "09:00-19:00",
    originalPrice: 135000,
    discount: 15,
    price: 114750,
    description:
      "겨울연가 촬영지 남이섬과 프랑스 마을 쁘띠프랑스를 방문하는 프라이빗 투어입니다.",
    highlights: [
      "남이섬 자유 시간",
      "쁘띠프랑스 포토 타임",
      "전용 차량 제공",
      "한식 점심 포함",
    ],
    includes: ["전용 차량", "전문 드라이버", "입장료", "점심 식사"],
  },
];

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tourId = Number(id);
  const tour = packageTours.find((item) => item.id === tourId);

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Tour not found
      </div>
    );
  }

  const discountedPrice = tour.originalPrice * (1 - tour.discount / 100);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <div className="relative w-full h-[400px] md:h-[500px]">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Floating Action Buttons */}
        <div className="absolute top-6 right-6 flex gap-3">
          <button className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition">
            <Heart className="w-5 h-5 text-gray-700" />
          </button>
          <button className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition">
            <Share2 className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2">
            {/* Title & Rating */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-3">
                {tour.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#F8F1E7] text-[#8B1E26] rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {tour.title}
              </h1>

              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.floor(tour.rating)
                          ? "fill-[#D4A017] text-[#D4A017]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-lg font-bold text-gray-900">
                    {tour.rating}
                  </span>
                </div>
                <span className="text-gray-600">
                  ({tour.reviews.toLocaleString()} reviews)
                </span>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="bg-[#F8F1E7] border-l-4 border-[#D4A017] p-4 rounded-lg mb-6">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#8B1E26]" />
                <p className="text-sm font-semibold text-gray-800">
                  99% of travelers recommend this experience
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {tour.description}
              </p>
            </div>

            {/* Highlights */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Tour Highlights
              </h2>
              <ul className="space-y-3">
                {tour.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#8B1E26] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What's Included */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                What's Included
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tour.includes.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 font-bold">✓</span>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Free Cancellation */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
              <p className="text-blue-800 font-semibold">Free Cancellation</p>
              <p className="text-blue-700 text-sm mt-1">
                Cancel up to 24 hours before tour starts. See Details.
              </p>
            </div>
          </div>

          {/* Right Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg">
                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-gray-500 line-through text-lg">
                      ₩{tour.originalPrice.toLocaleString()}
                    </span>
                    <span className="bg-[#8B1E26] text-white px-2 py-1 rounded text-xs font-bold">
                      {tour.discount}% OFF
                    </span>
                  </div>
                  <div className="text-4xl font-bold text-[#8B1E26]">
                    ₩{discountedPrice.toLocaleString()}
                  </div>
                  <p className="text-gray-600 text-sm mt-1">per person</p>
                </div>

                {/* Quick Info */}
                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-semibold text-gray-900">
                        {tour.duration}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Time</p>
                      <p className="font-semibold text-gray-900">
                        {tour.timeRequired}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Minimum</p>
                      <p className="font-semibold text-gray-900">
                        {tour.minimumPax} person{tour.minimumPax > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E26] focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of People
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E26] focus:border-transparent outline-none">
                      <option>1 person</option>
                      <option>2 people</option>
                      <option>3 people</option>
                      <option>4+ people</option>
                    </select>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-[#8B1E26] hover:bg-[#6E0D0D] text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 mb-3">
                  Reserve Now
                </button>

                <p className="text-center text-xs text-gray-500">
                  You won't be charged yet
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
