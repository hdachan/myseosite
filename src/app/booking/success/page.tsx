"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  CheckCircle,
  Home,
  Receipt,
  MapPin,
  CalendarClock,
} from "lucide-react";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId");
  // ✅ URL에서 type을 가져옴 (PAYMENT 또는 RESERVATION)
  const type = searchParams.get("type");

  // ✅ 예약인지 확인하는 변수
  const isReservation = type === "RESERVATION";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 pt-32">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-500">
        {/* 1. 상단 배경색 및 아이콘 분기 처리 */}
        <div
          className={`${isReservation ? "bg-blue-600" : "bg-green-600"} p-8 text-center transition-colors`}
        >
          <div className="mx-auto w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
            {isReservation ? (
              <CalendarClock className="w-10 h-10 text-white" />
            ) : (
              <CheckCircle className="w-10 h-10 text-white" />
            )}
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">
            {isReservation ? "Reservation Confirmed!" : "Payment Successful!"}
          </h1>

          <p
            className={`${isReservation ? "text-blue-100" : "text-green-100"} text-sm`}
          >
            {isReservation
              ? "Your request has been successfully received."
              : "Thank you for your booking."}
          </p>
        </div>

        {/* 하단 정보 */}
        <div className="p-8">
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 mb-8">
            <div className="flex items-start gap-3 mb-4 border-b border-gray-200 pb-4">
              <Receipt className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                  Order Number
                </p>
                <p className="text-sm font-mono text-gray-900 font-bold break-all">
                  {orderId || "Processing..."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-5 h-5 flex items-center justify-center">
                <div
                  className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                    isReservation ? "bg-blue-500" : "bg-green-500"
                  }`}
                ></div>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                  Status
                </p>
                {/* 2. 상태 텍스트 분기 처리 */}
                <p
                  className={`text-sm font-bold ${isReservation ? "text-blue-600" : "text-green-600"}`}
                >
                  {isReservation ? "Confirmed (Pay Later)" : "Paid & Confirmed"}
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-gray-500 text-sm mb-8">
            A confirmation email has been sent to your inbox.
            <br />
            (We look forward to seeing you!)
          </p>

          <div className="space-y-3">
            <Link
              href="/"
              className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Home className="w-5 h-5" />
              Return to Home
            </Link>
          </div>
        </div>
      </div>

      <p className="mt-8 text-xs text-gray-400">
        Need help? help@seoulcitytour.com
      </p>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-300"></div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
