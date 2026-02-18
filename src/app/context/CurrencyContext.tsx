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
  // ✅ 나중에 USD를 다시 쓰려면 초기값을 "USD"로 바꾸고 isLoading을 true로 바꾸세요.
  const [currency, setCurrencyState] = useState<"KRW" | "USD">("KRW");
  const [exchangeRate, setExchangeRate] = useState(1350);
  const [isLoading, setIsLoading] = useState(false); // API를 안 쓰므로 false 고정

  // 사용자의 통화 선택을 저장하는 함수 (현재는 기능 중지)
  const setCurrency = (cur: "KRW" | "USD") => {
    // 나중에 복구하려면 아래 두 줄의 주석을 푸세요.
    // setCurrencyState(cur);
    // localStorage.setItem("user_preferred_currency", cur);
  };

  useEffect(() => {
    // ✅ 나중에 환율 API를 다시 쓰려면 아래 fetchRate 로직 전체의 주석을 푸세요.
    /*
    const fetchRate = async () => {
      try {
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
    */
  }, []);

  // ✅ 가격 변환 함수 (현재 KRW 전용으로 작동)
  const formatPrice = (priceKRW: number) => {
    // 항상 원화 형식을 반환합니다.
    return `₩${Math.round(priceKRW).toLocaleString()}`;

    /* ✅ 나중에 USD 변환 기능이 다시 필요하면 위 return을 지우고 아래 주석을 푸세요.
    if (currency === "KRW") {
      return `₩${Math.round(priceKRW).toLocaleString()}`;
    } else {
      const priceUSD = Number((priceKRW / exchangeRate).toFixed(2));
      return `$${priceUSD.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    }
    */
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
