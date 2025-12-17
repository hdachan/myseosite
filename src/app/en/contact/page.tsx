import React from "react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Hero Section */}
      <div className="relative pb-32">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/background_korea_pt2.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-red-700/80 via-red-800/80 to-red-900/80" />

        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 relative">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 tracking-wide">
            Contact Us
          </h1>
          <p className="text-red-100 text-base md:text-lg max-w-2xl">
            Reach our team anytime for travel assistance in Korea
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-900 via-red-600 to-red-900" />
      </div>

      {/* Contact Overview - Overlapping */}
      <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-10 pb-16">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-t-2 border-red-800">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Instant Contact */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Instant Contact
              </h2>

              <div className="space-y-4">
                <a
                  href="https://api.whatsapp.com/message/WAPNAALNN7UUL1?autoload=1&app_absent=0"
                  target="_blank"
                  className="flex items-center gap-4 p-5 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition"
                >
                  <MessageCircle className="w-7 h-7 text-green-600" />
                  <div>
                    <p className="font-bold text-gray-900">WhatsApp</p>
                    <p className="text-sm text-gray-600">+82 10 8736 2140</p>
                  </div>
                </a>

                <a
                  href="https://qr.kakao.com/talk/_MUOV7whPhIbnJ4Kx6NszOwhnTo-"
                  target="_blank"
                  className="flex items-center gap-4 p-5 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition"
                >
                  <MessageCircle className="w-7 h-7 text-yellow-500" />
                  <div>
                    <p className="font-bold text-gray-900">KakaoTalk</p>
                    <p className="text-sm text-gray-600">+82 10 8736 2140</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Language / Office */}
            <div className="space-y-6">
              <div>
                <p className="font-bold text-gray-900 mb-2">English / 日本語</p>
                <p className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-4 h-4" />
                  +82 10 4082 7451
                </p>
              </div>

              <div>
                <p className="font-bold text-gray-900 mb-2">
                  中国语预定 (Chinese Reservation)
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-4 h-4" />
                  +82 10 5617 9039
                </p>
              </div>

              <div className="pt-4 border-t space-y-2 text-sm text-gray-700">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Seoul, Korea
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Tel: +82 2 774 3345
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Fax: +82 2 774 8222
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  mail@seoulcitytour.net
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
