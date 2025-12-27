"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Heart,
  Share2,
  Clock,
  Calendar,
  CheckCircle2,
  MapPin,
  Info,
  ChevronLeft,
  ChevronRight,
  Shield,
  RefreshCw,
  Minus,
  Plus,
  ChevronUp,
  ChevronDown,
  Search,
  X,
} from "lucide-react";
import { PackageTour } from "../packageData";

import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

interface Props {
  tour: PackageTour;
}

export default function PackageDetailClient({ tour }: Props) {
  const addItem = useCartStore((state) => state.addItem);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [packageDetailsOpen, setPackageDetailsOpen] = useState(true);
  const [pickupOpen, setPickupOpen] = useState(true);

  const images = tour.images || [tour.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const selectedPackage = tour.packageOptions?.find(
    (opt) => opt.id === selectedOption
  );
  const totalPrice = selectedPackage
    ? selectedPackage.price * (adults + children)
    : 0;

  const handleReset = () => {
    setSelectedOption("");
    setAdults(0);
    setChildren(0);
  };

  const handleAddToCart = () => {
    if (!selectedPackage) {
      toast.error("Please select a package option");
      return;
    }

    if (adults === 0 && children === 0) {
      toast.error("Please select at least 1 person");
      return;
    }

    addItem({
      slug: tour.slug,
      title: tour.title,
      image: tour.images?.[0] || tour.image,
      optionId: selectedPackage.id,
      optionName: selectedPackage.name,
      adults,
      children,
      pricePerPerson: selectedPackage.price,
      totalPrice,
    });

    toast.success(`Added to cart! (${adults + children} people)`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4"
      >
        <ol className="flex items-center gap-2 text-sm text-gray-600">
          <li>
            <Link href="/en" className="hover:text-red-600">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/en/package" className="hover:text-red-600">
              Package Tours
            </Link>
          </li>
          <li>/</li>
          <li className="text-red-600 font-semibold line-clamp-1">
            {tour.title}
          </li>
        </ol>
      </nav>

      {/* Image Gallery */}
      <section className="relative w-full h-96 md:h-[500px] bg-black">
        <Image
          src={images[currentImageIndex]}
          alt={`${tour.title} - Image ${currentImageIndex + 1}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <button
          onClick={prevImage}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition shadow-lg"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button
          onClick={nextImage}
          aria-label="Next image"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition shadow-lg"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>

        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {images.length}
        </div>

        <div className="absolute top-4 right-4 flex gap-2">
          <button
            aria-label="Add to favorites"
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition shadow-lg"
          >
            <Heart className="w-5 h-5 text-gray-700" />
          </button>
          <button
            aria-label="Share tour"
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition shadow-lg"
          >
            <Share2 className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="space-y-6">
          {/* Tags & Title */}
          <div className="flex gap-2">
            {tour.tags?.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-orange-100 text-orange-600 rounded text-sm font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>

          <header>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {tour.title}
            </h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-orange-400 text-orange-400" />
                <span className="font-bold text-lg">{tour.rating}</span>
              </div>
              <span className="text-gray-500">
                ({tour.reviews.toLocaleString()} reviews)
              </span>
            </div>
          </header>

          {/* Trust Badges */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">
                  Instant Confirmation
                </p>
                <p className="text-xs text-gray-600">Confirmed after booking</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">
                  Safe Travel
                </p>
                <p className="text-xs text-gray-600">Safety guaranteed</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <RefreshCw className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">
                  Free Cancellation
                </p>
                <p className="text-xs text-gray-600">Up to 24 hours before</p>
              </div>
            </div>
          </section>

          {/* Package Options Section with Sidebar */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Package Options */}
            <div className={selectedOption ? "lg:col-span-2" : "lg:col-span-3"}>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 border-l-4 border-orange-500 pl-3">
                    Package Options
                  </h2>
                  <button
                    onClick={handleReset}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Reset
                  </button>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">
                      Select Date & Package Option
                    </h3>
                    <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Check Availability
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    Select your tour date
                  </p>

                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-gray-700">
                      Choose Option
                    </p>
                    {tour.packageOptions?.map((opt) => (
                      <label
                        key={opt.id}
                        className={`block p-4 rounded-lg border-2 cursor-pointer transition ${
                          selectedOption === opt.id
                            ? "border-orange-500 bg-white shadow-md"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="package"
                            value={opt.id}
                            checked={selectedOption === opt.id}
                            onChange={(e) => setSelectedOption(e.target.value)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-gray-900">
                                {opt.name}
                              </span>
                              {opt.badge && (
                                <span className="px-2 py-0.5 bg-orange-500 text-white text-xs rounded font-semibold">
                                  {opt.badge}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {selectedOption && (
                  <>
                    <div className="space-y-4 mb-6">
                      <p className="text-sm font-semibold text-gray-700">
                        Quantity
                      </p>

                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                        <span className="font-medium text-gray-900">Adult</span>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setAdults(Math.max(0, adults - 1))}
                            aria-label="Decrease adults"
                            className="w-10 h-10 rounded border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition"
                          >
                            <Minus className="w-5 h-5 text-gray-600" />
                          </button>
                          <span className="w-12 text-center font-semibold text-lg">
                            {adults}
                          </span>
                          <button
                            onClick={() => setAdults(adults + 1)}
                            aria-label="Increase adults"
                            className="w-10 h-10 rounded border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition"
                          >
                            <Plus className="w-5 h-5 text-gray-600" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                        <span className="font-medium text-gray-900">
                          Child (Ages 2-9)
                        </span>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() =>
                              setChildren(Math.max(0, children - 1))
                            }
                            aria-label="Decrease children"
                            className="w-10 h-10 rounded border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition"
                          >
                            <Minus className="w-5 h-5 text-gray-600" />
                          </button>
                          <span className="w-12 text-center font-semibold text-lg">
                            {children}
                          </span>
                          <button
                            onClick={() => setChildren(children + 1)}
                            aria-label="Increase children"
                            className="w-10 h-10 rounded border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition"
                          >
                            <Plus className="w-5 h-5 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-baseline justify-between mb-6 pb-6 border-b border-gray-200">
                      <div>
                        <span className="text-3xl font-bold text-gray-900">
                          $ {totalPrice.toFixed(2)}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          Total price for selected option
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={handleAddToCart}
                        disabled={
                          !selectedPackage || (adults === 0 && children === 0)
                        }
                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 rounded-lg transition shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        Add to Cart
                      </button>
                      <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-lg transition shadow-lg">
                        Book Now
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right: Detail Info Sidebar */}
            {selectedOption && (
              <aside className="lg:col-span-1">
                <div className="space-y-4">
                  {/* Package Details */}
                  <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <button
                      onClick={() => setPackageDetailsOpen(!packageDetailsOpen)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
                    >
                      <h3 className="font-bold text-gray-900">
                        Package Details
                      </h3>
                      {packageDetailsOpen ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>

                    {packageDetailsOpen && selectedPackage && (
                      <div className="px-4 pb-4 space-y-4">
                        <div>
                          <div className="flex items-start gap-2 mb-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-semibold text-sm text-gray-900 mb-1">
                                Included
                              </p>
                              <ul className="space-y-1">
                                {selectedPackage.details.map((detail, i) => (
                                  <li key={i} className="text-sm text-gray-700">
                                    {detail}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        {selectedPackage.excluded && (
                          <div>
                            <div className="flex items-start gap-2">
                              <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="font-semibold text-sm text-gray-900 mb-1">
                                  Excluded
                                </p>
                                <ul className="space-y-1">
                                  {selectedPackage.excluded.map((item, i) => (
                                    <li
                                      key={i}
                                      className="text-sm text-gray-700"
                                    >
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </section>

                  {/* Pickup Info */}
                  <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <button
                      onClick={() => setPickupOpen(!pickupOpen)}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
                    >
                      <h3 className="font-bold text-gray-900">
                        Pickup/Meeting Info
                      </h3>
                      {pickupOpen ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>

                    {pickupOpen && (
                      <div className="px-4 pb-4 space-y-4">
                        <div>
                          <p className="font-semibold text-sm text-gray-900 mb-3">
                            Departure
                          </p>
                          <div className="relative mb-3">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Search available locations"
                              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                            />
                          </div>

                          <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                            <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-semibold text-sm text-gray-900">
                                07:30 - 08:00
                              </p>
                              <p className="text-xs text-gray-600 mt-1">
                                Available from all locations in Seoul
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </section>

                  {/* Additional Info */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex gap-2 flex-wrap">
                      <span className="px-3 py-1 bg-white text-blue-700 rounded-full text-xs font-medium border border-blue-200">
                        Available from tomorrow
                      </span>
                      <span className="px-3 py-1 bg-white text-blue-700 rounded-full text-xs font-medium border border-blue-200">
                        Cancel 24h before
                      </span>
                      <span className="px-3 py-1 bg-white text-gray-700 rounded-full text-xs font-medium border border-gray-200">
                        Min group: {tour.minimumPax} people
                      </span>
                      <span className="px-3 py-1 bg-white text-gray-700 rounded-full text-xs font-medium border border-gray-200">
                        Instant confirmation
                      </span>
                    </div>
                  </div>
                </div>
              </aside>
            )}
          </section>

          {/* Description */}
          <section className="bg-white p-6 rounded-xl border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Activity Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {tour.fullDescription || tour.description}
            </p>
          </section>

          {/* Includes/Excludes */}
          {(tour.includes || tour.excludes) && (
            <section className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="grid md:grid-cols-2 gap-6">
                {tour.includes && (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      What's Included
                    </h3>
                    <ul className="space-y-2">
                      {tour.includes.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm text-gray-700"
                        >
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {tour.excludes && (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Info className="w-5 h-5 text-gray-400" />
                      What's Excluded
                    </h3>
                    <ul className="space-y-2">
                      {tour.excludes.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm text-gray-700"
                        >
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Meeting Point */}
          {tour.meetingPoint && (
            <section className="bg-white p-6 rounded-xl border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-500" />
                Meeting Point
              </h2>
              <p className="text-gray-700">{tour.meetingPoint}</p>
            </section>
          )}

          {/* Cancellation Policy */}
          {tour.cancellation && (
            <section className="bg-green-50 border border-green-200 p-6 rounded-xl">
              <h3 className="font-bold text-green-900 mb-2">
                Cancellation Policy
              </h3>
              <p className="text-green-800 text-sm">{tour.cancellation}</p>
            </section>
          )}
        </article>
      </main>
    </div>
  );
}
