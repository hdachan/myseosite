"use client";

import React, { useState } from "react";
import { X, Plus, Minus, Trash2 } from "lucide-react";

interface CartItem {
  id: number;
  title: string;
  image: string;
  location: string;
  date: string;
  time: string;
  adults: number;
  children: number;
  price: number;
  originalPrice?: number;
  discount?: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      title: "[Muslim Friendly] Special Seoul/Nami Island Day Tour",
      image:
        "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=600&h=400&fit=crop",
      location: "Tour · Seoul",
      date: "2025-01-15",
      time: "09:00 AM",
      adults: 2,
      children: 1,
      price: 112.79,
      originalPrice: 150.0,
      discount: 25,
    },
    {
      id: 2,
      title: "DMZ & North Korea Observation Tour",
      image:
        "https://images.unsplash.com/photo-1601096829474-4aae6cc5e66f?w=600&h=400&fit=crop",
      location: "Tour · DMZ",
      date: "2025-01-20",
      time: "08:00 AM",
      adults: 2,
      children: 0,
      price: 79.0,
    },
    {
      id: 3,
      title: "K-Drama Filming Location Tour",
      image:
        "https://images.unsplash.com/photo-1526481280691-3d3fcd7c61c9?w=600&h=400&fit=crop",
      location: "Tour · Seoul",
      date: "2025-01-18",
      time: "10:00 AM",
      adults: 1,
      children: 0,
      price: 65.5,
      originalPrice: 92.0,
      discount: 29,
    },
  ]);

  const updateQuantity = (
    id: number,
    type: "adults" | "children",
    value: number
  ) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, [type]: Math.max(0, item[type] + value) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const calculateItemTotal = (item: CartItem) => {
    return item.price * (item.adults + item.children * 0.7);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + calculateItemTotal(item),
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      {/* Hero Section */}
      <div className="relative pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-red-700/90 via-red-800/90 to-red-900/90" />

        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 relative">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Shopping Cart
          </h1>
          <p className="text-red-100 mt-3">
            Review your selected tours and proceed to checkout
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-900 via-red-600 to-red-900" />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-10">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-t-2 border-red-800">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Cart Items ({cartItems.length})
              </h2>

              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row gap-4 pb-6 border-b border-gray-200 last:border-0"
                  >
                    {/* Image */}
                    <div className="relative w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      {item.discount && (
                        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                          {item.discount}% OFF
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">
                            {item.location}
                          </p>
                          <h3 className="text-base font-bold text-gray-900 mb-2">
                            {item.title}
                          </h3>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-600 transition ml-4"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <div className="text-sm text-gray-600 mb-3">
                        <p>📅 {item.date}</p>
                        <p>🕐 {item.time}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-wrap gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-700">Adults:</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, "adults", -1)
                            }
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center font-semibold">
                            {item.adults}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, "adults", 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-700">
                            Children:
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, "children", -1)
                            }
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center font-semibold">
                            {item.children}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, "children", 1)
                            }
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-3">
                        {item.discount ? (
                          <>
                            <span className="text-sm text-gray-400 line-through">
                              $ {item.originalPrice}
                            </span>
                            <span className="text-xl font-bold text-red-600">
                              $ {item.price}
                            </span>
                            <span className="text-xs text-gray-500">
                              per person
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-xl font-bold text-gray-900">
                              $ {item.price}
                            </span>
                            <span className="text-xs text-gray-500">
                              per person
                            </span>
                          </>
                        )}
                      </div>

                      <div className="mt-2 text-sm font-semibold text-gray-700">
                        Subtotal: $ {calculateItemTotal(item).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {cartItems.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg mb-4">
                    Your cart is empty
                  </p>
                  <a
                    href="/en/package"
                    className="inline-block bg-red-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-800 transition"
                  >
                    Browse Tours
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 border-t-2 border-red-800 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax (10%)</span>
                  <span className="font-semibold">$ {tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-300 pt-3 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-red-700">$ {total.toFixed(2)}</span>
                </div>
              </div>

              <button
                className="w-full bg-red-700 text-white py-4 rounded-lg font-bold text-lg hover:bg-red-800 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>

              <a
                href="/en/package"
                className="block text-center text-red-700 hover:text-red-800 font-semibold mt-4 transition"
              >
                Continue Shopping
              </a>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Booking Benefits
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Free cancellation up to 24 hours before</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Instant confirmation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Professional English-speaking guide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Hotel pickup available</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
