"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } =
    useCartStore();

  const handleRemove = (slug: string, optionId: string, title: string) => {
    removeItem(slug, optionId);
    toast.success(`Removed "${title}"`);
  };

  const handleClearCart = () => {
    if (confirm("Clear all items from cart?")) {
      clearCart();
      toast.success("Cart cleared");
    }
  };

  const handleQuantityChange = (
    item: any,
    type: "adults" | "children",
    change: number
  ) => {
    const newAdults = type === "adults" ? item.adults + change : item.adults;
    const newChildren =
      type === "children" ? item.children + change : item.children;

    if (newAdults < 0 || newChildren < 0) return;
    if (newAdults === 0 && newChildren === 0) {
      handleRemove(item.slug, item.optionId, item.title);
      return;
    }

    updateQuantity(item.slug, item.optionId, newAdults, newChildren);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 mb-8">
              Start adding tours to your cart to see them here!
            </p>
            <Link
              href="/en/package"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Browse Tours
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600 mt-1">
              {items.length} {items.length === 1 ? "item" : "items"} in your
              cart
            </p>
          </div>
          <button
            onClick={handleClearCart}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.slug}-${item.optionId}`}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition"
              >
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/en/package/${item.slug}`}
                      className="font-bold text-lg text-gray-900 hover:text-orange-600 transition line-clamp-2"
                    >
                      {item.title}
                    </Link>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.optionName}
                    </p>

                    {/* Quantity Controls */}
                    <div className="mt-4 space-y-3">
                      {/* Adults */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">
                          Adults
                        </span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              handleQuantityChange(item, "adults", -1)
                            }
                            className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">
                            {item.adults}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item, "adults", 1)
                            }
                            className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Children */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">
                          Children
                        </span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              handleQuantityChange(item, "children", -1)
                            }
                            className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">
                            {item.children}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item, "children", 1)
                            }
                            className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Price & Remove */}
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-2xl font-bold text-orange-600">
                        $ {item.totalPrice.toFixed(2)}
                      </span>
                      <button
                        onClick={() =>
                          handleRemove(item.slug, item.optionId, item.title)
                        }
                        className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div
                    key={`${item.slug}-${item.optionId}`}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-gray-600 line-clamp-1">
                      {item.title} × {item.adults + item.children}
                    </span>
                    <span className="font-semibold text-gray-900">
                      $ {item.totalPrice.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-3xl font-bold text-orange-600">
                    $ {getTotalPrice().toFixed(2)}
                  </span>
                </div>
              </div>

              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-lg transition shadow-lg">
                Proceed to Checkout
              </button>

              <Link
                href="/en/package"
                className="block text-center text-gray-600 hover:text-gray-900 text-sm mt-4"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
