"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";
// ✅ 1. 구글 번역 컴포넌트 불러오기
import GoogleTranslate from "@/components/GoogleTranslate";

export default function Header() {
  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/company", label: "About Us" },
    { href: "/package", label: "Package Tours" },
    { href: "/private", label: "Private Tours" },
    { href: "/contact", label: "Contact" },
  ];

  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    const unsubscribe = useCartStore.subscribe((state) => {
      setCartItemsCount(state.getTotalItems());
    });
    setCartItemsCount(useCartStore.getState().getTotalItems());
    return unsubscribe;
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* 🪟 Glass Layer (배경) - 투명도를 조금 더 올려서(80%) 글씨가 더 잘 보이게 수정 */}
      <div className="absolute inset-0 backdrop-blur-md bg-white/80 border-b border-gray-200/50" />

      {/* ⭐ 핵심 변경: 
        max-w-7xl -> max-w-6xl (폭 좁히기)
        px-6 lg:px-10 -> px-8 lg:px-12 (여백 늘리기)
        => 아래 투어 상품 섹션과 '시작 라인'을 완벽하게 맞춤
      */}
      <nav className="relative max-w-6xl mx-auto flex items-center justify-between px-8 lg:px-12 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Seoul City Tour Logo"
            width={200}
            height={52}
            className="h-10 w-auto object-contain" // 높이 살짝 조정 (h-11 -> h-10)하여 균형 맞춤
            priority // 로고는 중요하니까 빨리 로딩
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {" "}
          {/* 간격 gap-6 -> gap-8로 시원하게 */}
          {menuItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="relative text-[15px] font-semibold text-gray-700 hover:text-[#FF5B00] transition-colors" // Klook 스타일: 마우스 올리면 주황색
            >
              {label}
              {/* 밑줄 애니메이션 (주황색으로 변경) */}
              {/* <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#FF5B00] transition-all duration-300 hover:w-full" /> */}
            </Link>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-5">
          {/* ✅ 3. 테스트용 구글 번역 위젯 */}
          <div className="hidden md:block">
            <GoogleTranslate />
          </div>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative p-2 text-gray-600 hover:text-[#FF5B00] transition-colors"
          >
            <ShoppingCart size={22} />
            {cartItemsCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#FF5B00] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                {cartItemsCount}
              </span>
            )}
          </Link>

          {/* Mobile Toggle */}
          <label
            htmlFor="mobile-menu"
            className="lg:hidden cursor-pointer p-2 text-gray-800 hover:text-[#FF5B00] transition-colors"
          >
            <Menu size={26} />
          </label>
        </div>
      </nav>
    </header>
  );
}
