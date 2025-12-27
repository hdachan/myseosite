"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

export default function Header() {
  const menuItems = [
    { href: "/en", label: "Home" },
    { href: "/en/company", label: "About Us" },
    { href: "/en/package", label: "Package Tours" },
    { href: "/en/private", label: "Private Tours" },
    { href: "/en/contact", label: "Contact" },
  ];

  // 서버에서는 0, 클라이언트에서 실제 값으로 업데이트
  const [cartItemsCount, setCartItemsCount] = useState(0);

  // Zustand 상태 구독 → 변경 시 즉시 업데이트
  useEffect(() => {
    const unsubscribe = useCartStore.subscribe((state) => {
      setCartItemsCount(state.getTotalItems());
    });

    // 초기값 설정
    setCartItemsCount(useCartStore.getState().getTotalItems());

    return unsubscribe;
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.06)]">
      <input type="checkbox" id="mobile-menu" className="peer hidden" />

      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 py-3 lg:py-4">
        <Link href="/en" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Seoul City Tour Logo"
            width={200}
            height={52}
            className="w-auto h-11 lg:h-12 object-contain"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-5">
          {menuItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="relative px-3 py-2 text-[15px] font-medium text-gray-800 hover:text-[#4A7C7E] transition group"
            >
              {label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#4A7C7E] transition-all duration-300 group-hover:w-3/4" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <Link
            href="/en/cart"
            className="relative p-2 text-gray-700 hover:text-[#4A7C7E] transition"
            aria-label="Shopping Cart"
          >
            <ShoppingCart size={24} />
            <span
              className={`absolute -top-1 -right-1 bg-[#E31E24] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transition-opacity duration-200 pointer-events-none ${
                cartItemsCount > 0 ? "opacity-100" : "opacity-0"
              }`}
            >
              {cartItemsCount}
            </span>
          </Link>

          <div className="hidden sm:flex items-center gap-3 border-l border-gray-300 pl-4">
            <Link
              href="/ko"
              className="text-gray-700 hover:text-[#4A7C7E] text-[14px] font-medium"
            >
              한국어
            </Link>
            <Link
              href="/en"
              className="bg-[#4A7C7E] text-white px-4 py-1.5 rounded-md text-xs font-semibold hover:bg-[#3D6566] transition"
            >
              EN
            </Link>
          </div>

          <label
            htmlFor="mobile-menu"
            className="lg:hidden cursor-pointer p-2 text-[#4A7C7E] relative w-10 h-10 flex items-center justify-center"
          >
            <Menu
              size={28}
              className="absolute transition-opacity peer-checked:opacity-0"
            />
            <X
              size={28}
              className="absolute opacity-0 transition-opacity peer-checked:opacity-100"
            />
          </label>
        </div>
      </nav>

      <div className="h-[2px] bg-gradient-to-r from-[#4A7C7E] via-[#5A8C8E] to-[#4A7C7E]" />

      <div className="fixed inset-0 bg-black/50 z-40 hidden peer-checked:block lg:hidden" />

      <div className="fixed inset-0 bg-white z-40 h-screen -translate-y-full peer-checked:translate-y-0 transition-transform duration-500 ease-in-out lg:hidden overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b-2 border-[#4A7C7E]">
          <Link href="/en">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={180}
              height={48}
              className="h-10 w-auto"
            />
          </Link>
          <label
            htmlFor="mobile-menu"
            className="p-2 text-[#4A7C7E] cursor-pointer"
          >
            <X size={30} />
          </label>
        </div>

        <div className="flex flex-col items-center justify-center h-full pb-28 gap-10">
          {menuItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-3xl font-semibold text-gray-800 hover:text-[#4A7C7E] transition relative group"
            >
              {label}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-1 bg-[#4A7C7E] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}

          <Link
            href="/en/cart"
            className="text-3xl font-semibold text-gray-800 hover:text-[#4A7C7E] transition relative group flex items-center gap-3"
          >
            <ShoppingCart size={32} />
            Cart {cartItemsCount > 0 && `(${cartItemsCount})`}
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-1 bg-[#4A7C7E] transition-all duration-300 group-hover:w-full" />
          </Link>

          <div className="mt-10 flex flex-col items-center gap-5">
            <Link
              href="/ko"
              className="text-gray-700 hover:text-[#4A7C7E] text-xl font-semibold transition"
            >
              한국어
            </Link>
            <Link
              href="/en"
              className="bg-[#4A7C7E] text-white px-14 py-3 rounded-lg text-lg font-bold hover:bg-[#3D6566] shadow-md transition"
            >
              ENGLISH
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
