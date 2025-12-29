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
      {/* 🪟 Glass Layer */}
      <div className="absolute inset-0 backdrop-blur-md bg-white/55 border-b border-black/10" />

      <nav className="relative max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 py-4">
        {/* Logo */}
        <Link href="/en" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Seoul City Tour Logo"
            width={200}
            height={52}
            className="h-11 w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          {menuItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="relative text-[14.5px] tracking-wide font-medium text-neutral-800 hover:text-neutral-900 transition"
            >
              {label}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-neutral-900/70 transition-all duration-300 hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-5">
          {/* Cart */}
          <Link
            href="/en/cart"
            className="relative p-2 text-neutral-700 hover:text-neutral-900 transition"
          >
            <ShoppingCart size={22} />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-neutral-900 text-white text-[11px] font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Link>

          {/* Language */}
          <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-black/10">
            <Link
              href="/ko"
              className="text-[13px] text-neutral-700 hover:text-neutral-900 transition"
            >
              KR
            </Link>
            <Link
              href="/en"
              className="px-4 py-1.5 text-[11px] font-semibold rounded-full border border-black/15 hover:bg-black/5 transition"
            >
              EN
            </Link>
          </div>

          {/* Mobile Toggle */}
          <label
            htmlFor="mobile-menu"
            className="lg:hidden cursor-pointer p-2 text-neutral-800"
          >
            <Menu size={26} />
          </label>
        </div>
      </nav>
    </header>
  );
}
