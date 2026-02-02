"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface CurrencyContextType {
  currency: "KRW" | "USD";
  exchangeRate: number;
  setCurrency: (cur: "KRW" | "USD") => void;
  formatPrice: (priceKRW: number) => string;
  isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined,
);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  // ✅ 변경 1: 초기값을 로컬스토리지에서 가져오도록 설정 (새로고침 시 유지)
  const [currency, setCurrencyState] = useState<"KRW" | "USD">("USD");
  const [exchangeRate, setExchangeRate] = useState(1350);
  const [isLoading, setIsLoading] = useState(true);

  // 사용자의 통화 선택을 저장하는 함수
  const setCurrency = (cur: "KRW" | "USD") => {
    setCurrencyState(cur);
    localStorage.setItem("user_preferred_currency", cur);
  };

  useEffect(() => {
    const fetchRate = async () => {
      try {
        // ✅ 변경 2: 사용자 선호 통화 불러오기
        const savedCurrency = localStorage.getItem(
          "user_preferred_currency",
        ) as "KRW" | "USD";
        if (savedCurrency) setCurrencyState(savedCurrency);

        const CACHE_KEY = "korea_tour_exchange_rate";
        const CACHE_EXPIRY = 12 * 60 * 60 * 1000;
        const cachedData = localStorage.getItem(CACHE_KEY);

        if (cachedData) {
          const { rate, timestamp } = JSON.parse(cachedData);
          if (Date.now() - timestamp < CACHE_EXPIRY) {
            setExchangeRate(rate);
            setIsLoading(false);
            return;
          }
        }

        const API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY;
        // API 키가 없을 경우를 대비한 방어 로직
        if (!API_KEY) {
          console.warn("Exchange Rate API Key is missing. Using default rate.");
          setIsLoading(false);
          return;
        }

        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`,
        );
        const data = await response.json();

        if (data.result === "success") {
          const newRate = data.conversion_rates.KRW;
          setExchangeRate(newRate);
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ rate: newRate, timestamp: Date.now() }),
          );
        }
      } catch (error) {
        console.error("환율 로딩 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRate();
  }, []);

  // ✅ 변경 3: 가격 변환 함수 (KPN 소수점 정합성 강화)
  const formatPrice = (priceKRW: number) => {
    if (currency === "KRW") {
      return `₩${Math.round(priceKRW).toLocaleString()}`;
    } else {
      // 소수점 계산 시 발생할 수 있는 부동소수점 오차 방지를 위해 toFixed 적용 후 숫자로 변환
      const priceUSD = Number((priceKRW / exchangeRate).toFixed(2));
      return `$${priceUSD.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, exchangeRate, setCurrency, formatPrice, isLoading }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context)
    throw new Error("useCurrency must be used within a CurrencyProvider");
  return context;
};
