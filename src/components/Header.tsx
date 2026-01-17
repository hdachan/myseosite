"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // ✅ 1. 주소 확인용 훅 추가

/* ✅ 폰트 가져오기 */
import { hangameFont } from "@/lib/fonts";

export default function Header() {
  const pathname = usePathname(); // ✅ 2. 현재 주소 가져오기

  // ✅ 3. 만약 주소가 '/studio'로 시작하면? -> 헤더를 아예 그리지 않음 (null 반환)
  if (pathname?.startsWith("/studio")) {
    return null;
  }

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/company", label: "About Us" },
    { href: "/package", label: "Package Tours" },
    { href: "/private", label: "Private Tours" },
    { href: "/contact", label: "Contact" },
  ];

  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = useCartStore.subscribe((state) => {
      setCartItemsCount(state.getTotalItems());
    });
    setCartItemsCount(useCartStore.getState().getTotalItems());
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const textColorClass = "text-gray-800 hover:text-[#FF5B00]";
  const iconColorClass = "text-gray-600 hover:text-[#FF5B00]";

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white border-b border-gray-200 shadow-sm transition-all duration-300">
      <nav className="relative max-w-6xl mx-auto flex items-center justify-between px-4 md:px-8 lg:px-12 py-3 lg:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center" onClick={closeMenu}>
          <Image
            src="/images/logo.png"
            alt="Seoul City Tour Logo"
            width={240}
            height={60}
            className="h-10 sm:h-12 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 self-end pb-2">
          {menuItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`${hangameFont.className} relative text-[17px] font-bold transition-colors ${textColorClass}`}
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
                className={`${hangameFont.className} text-2xl font-bold text-gray-800 hover:text-[#FF5B00] transition-colors border-b border-gray-100 pb-4`}
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
