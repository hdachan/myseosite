"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, ShoppingCart, X } from "lucide-react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = useCartStore.subscribe((state) => {
      setCartItemsCount(state.getTotalItems());
    });
    setCartItemsCount(useCartStore.getState().getTotalItems());

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      unsubscribe();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // ⭐ [핵심] 텍스트 색상 변수 설정
  // 스크롤 내렸을 때(isScrolled): 진한 회색 (text-gray-800)
  // 맨 위(투명): 흰색 (text-white) + 그림자 (drop-shadow-md) -> 배경이 밝아도 글씨가 보임
  const textColorClass = isScrolled
    ? "text-gray-800 hover:text-[#FF5B00]"
    : "text-white drop-shadow-md hover:text-[#FF5B00]";

  // ⭐ [핵심] 아이콘 색상 변수
  const iconColorClass = isScrolled
    ? "text-gray-600 hover:text-[#FF5B00]"
    : "text-white drop-shadow-md hover:text-[#FF5B00]";

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300">
      {/* 배경 레이어 */}
      <div
        className={`absolute inset-0 transition-all duration-300 ease-in-out ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
            : "bg-transparent border-b border-transparent"
        }`}
      />

      <nav className="relative max-w-6xl mx-auto flex items-center justify-between px-4 md:px-8 lg:px-12 py-3 lg:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center" onClick={closeMenu}>
          {/* ⭐ 로고 색상 반전 트릭
              brightness-0 invert: 이미지를 완전 흰색으로 만듦 (맨 위일 때)
              isScrolled일 때는 원래 색상 그대로
          */}
          <Image
            src="/images/logo.png"
            alt="Seoul City Tour Logo"
            width={200}
            height={52}
            className={`h-8 sm:h-10 w-auto object-contain transition-all duration-300 ${
              isScrolled ? "" : "brightness-0 invert drop-shadow-md"
            }`}
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {menuItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              // 위에서 만든 색상 변수 적용
              className={`relative text-[16px] font-bold transition-colors ${textColorClass}`}
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
            className={`relative p-2 transition-colors ${iconColorClass}`}
            onClick={closeMenu}
          >
            <ShoppingCart className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#FF5B00] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                {cartItemsCount}
              </span>
            )}
          </Link>

          {/* Hamburger Button (Mobile) */}
          <button
            onClick={toggleMenu}
            className={`lg:hidden cursor-pointer p-1.5 transition-colors z-50 ${iconColorClass}`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              // 메뉴 열렸을 때는 항상 어두운 색이어야 잘 보임 (배경이 흰색이니까)
              <X className="w-6 h-6 sm:w-[26px] sm:h-[26px] text-gray-800" />
            ) : (
              <Menu className="w-6 h-6 sm:w-[26px] sm:h-[26px]" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-0 bg-white z-40 lg:hidden flex flex-col pt-24 px-6 animate-in slide-in-from-right-10 duration-200">
          <div className="flex flex-col gap-6">
            {menuItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                className="text-2xl font-bold text-gray-800 hover:text-[#FF5B00] transition-colors border-b border-gray-100 pb-4"
              >
                {label}
              </Link>
            ))}
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
