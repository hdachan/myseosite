"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, ShoppingCart, X } from "lucide-react"; // ❌ 닫기 버튼 아이콘(X) 추가
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

export default function Header() {
  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/company", label: "About Us" },
    { href: "/package", label: "Package Tours" },
    { href: "/private", label: "Private Tours" },
    { href: "/contact", label: "Contact" },
  ];

  const [cartItemsCount, setCartItemsCount] = useState(0);

  // ⭐ 1. 모바일 메뉴 열림/닫힘 상태 관리
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = useCartStore.subscribe((state) => {
      setCartItemsCount(state.getTotalItems());
    });
    setCartItemsCount(useCartStore.getState().getTotalItems());
    return unsubscribe;
  }, []);

  // 메뉴 열기/닫기 함수
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // 메뉴 클릭 시 닫기 (이동 후 닫힘)
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* 🪟 Glass Layer (배경) */}
      <div className="absolute inset-0 backdrop-blur-md bg-white/80 border-b border-gray-200/50" />

      {/* PC/Tablet Nav */}
      <nav className="relative max-w-6xl mx-auto flex items-center justify-between px-4 md:px-8 lg:px-12 py-3 lg:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center" onClick={closeMenu}>
          <Image
            src="/images/logo.png"
            alt="Seoul City Tour Logo"
            width={200}
            height={52}
            className="h-8 sm:h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Menu (PC에서만 보임) */}
        <div className="hidden lg:flex items-center gap-8">
          {menuItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="relative text-[15px] font-semibold text-gray-700 hover:text-[#FF5B00] transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Cart */}
          <Link
            href="/cart"
            className="relative p-2 text-gray-600 hover:text-[#FF5B00] transition-colors"
            onClick={closeMenu}
          >
            <ShoppingCart className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#FF5B00] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                {cartItemsCount}
              </span>
            )}
          </Link>

          {/* ⭐ 2. 햄버거 버튼 (클릭 시 toggleMenu 실행) */}
          <button
            onClick={toggleMenu}
            className="lg:hidden cursor-pointer p-1.5 text-gray-800 hover:text-[#FF5B00] transition-colors z-50"
            aria-label="Toggle menu"
          >
            {/* 메뉴가 열려있으면 X, 닫혀있으면 햄버거 아이콘 보여줌 */}
            {isMenuOpen ? (
              <X className="w-6 h-6 sm:w-[26px] sm:h-[26px]" />
            ) : (
              <Menu className="w-6 h-6 sm:w-[26px] sm:h-[26px]" />
            )}
          </button>
        </div>
      </nav>

      {/* ⭐ 3. 모바일 메뉴 오버레이 (여기가 없어서 안 떴던 것!) */}
      {/* isMenuOpen이 true일 때만 화면에 나옴 */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[60px] bg-white z-40 lg:hidden flex flex-col p-6 animate-in slide-in-from-right-10 duration-200 border-t border-gray-100">
          <div className="flex flex-col gap-6 mt-4">
            {menuItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu} // 클릭하면 메뉴 닫힘
                className="text-xl font-bold text-gray-800 hover:text-[#FF5B00] transition-colors border-b border-gray-100 pb-4"
              >
                {label}
              </Link>
            ))}

            {/* 모바일 메뉴 하단 추가 정보 (선택사항) */}
            <div className="mt-4 text-sm text-gray-400">
              <p>Contact: +82 10-1234-5678</p>
              <p>Email: help@seoulcitytour.com</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
