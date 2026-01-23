import Link from "next/link";
import Image from "next/image";
import { Instagram, Youtube, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-sm text-gray-600">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Company</h4>
            <p className="leading-relaxed">
              Seoul City Tour Co., Ltd.
              <br />
              {/* \n 대신 <br /> 태그를 사용하세요 */}
              Rm 507, Hanaro Bldg, 194-4 Insa-dong, <br />
              Jongno-gu, Seoul, South Korea
            </p>
            <p className="mt-3">
              <a
                href="mailto:mail@seoulcitytour.net"
                className="hover:underline hover:text-[#4A7C7E]"
              >
                mail@seoulcitytour.net
              </a>
              <br />
              {/* ✅ 팩스 번호 추가 */}
              Tel. +82-2-774-3345 / Fax. +82-2-774-8223
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="hover:text-[#4A7C7E]">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#4A7C7E]">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/cancellation-policy"
                  className="hover:text-[#4A7C7E]"
                >
                  Cancellation & Refund Policy
                </Link>
              </li>
              <li className="pt-1">
                <Link
                  href="/blog"
                  className="font-medium hover:underline hover:text-[#4A7C7E]"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Explore</h4>
            <ul className="space-y-2 mb-6">
              <li>
                <Link href="/package" className="hover:text-[#4A7C7E]">
                  DMZ Tours
                </Link>
              </li>
              <li>
                <Link href="/tours/seoul-city" className="hover:text-[#4A7C7E]">
                  Seoul City Tours
                </Link>
              </li>
              <li>
                <Link href="/private" className="hover:text-[#4A7C7E]">
                  Private Tours
                </Link>
              </li>
            </ul>

            <ul className="space-y-1 text-xs text-gray-500">
              <li>
                <Link
                  href="/privacy"
                  className="hover:underline hover:text-[#4A7C7E]"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:underline hover:text-[#4A7C7E]"
                >
                  Terms of Service
                </Link>
              </li>
              <li className="pt-2">Business Reg. No: 101-86-38083</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-gray-200 pt-6 text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <Image
              src="/payments/mastercard.svg"
              alt="Mastercard"
              width={40}
              height={24}
            />
            <Image src="/payments/visa.png" alt="visa" width={40} height={24} />
            <Image src="/payments/jcb.png" alt="jcb" width={40} height={24} />
            <Image
              src="/payments/unionpay.png"
              alt="unionpay"
              width={40}
              height={24}
            />
          </div>

          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/seoulcitytour.official?igsh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-[#4A7C7E] transition"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.youtube.com/@HelloKOREA"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-[#4A7C7E] transition"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-[#4A7C7E] transition"
            >
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-gray-400">
          © 2004–2026 Seoul City Tour Co., Ltd. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
