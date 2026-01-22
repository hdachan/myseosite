import { create } from "zustand";
import { persist } from "zustand/middleware";

// ✅ 여기 인터페이스에 2줄 추가!
export interface CartItem {
  slug: string;
  title: string;
  image: string;
  optionId: string;
  optionName: string;
  adults: number;
  children: number;
  pricePerPerson: number;
  totalPrice: number;

  // 👇 이 두 줄을 꼭 추가해주세요! (결제할 때 필수)
  tourId: string;
  date: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (slug: string, optionId: string) => void;
  // ... (나머지는 그대로 두셔도 됩니다)
  updateQuantity: (
    slug: string,
    optionId: string,
    adults: number,
    children: number,
  ) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          // 중복 체크: 같은 상품 + 같은 옵션 + 같은 날짜(date)까지 같아야 진짜 중복
          const existingIndex = state.items.findIndex(
            (i) =>
              i.slug === item.slug &&
              i.optionId === item.optionId &&
              i.date === item.date,
          );

          if (existingIndex !== -1) {
            const updated = [...state.items];
            updated[existingIndex] = {
              ...updated[existingIndex],
              adults: updated[existingIndex].adults + item.adults,
              children: updated[existingIndex].children + item.children,
              totalPrice:
                (updated[existingIndex].adults +
                  item.adults +
                  updated[existingIndex].children +
                  item.children) *
                item.pricePerPerson,
            };
            return { items: updated };
          }
          return { items: [...state.items, item] };
        }),

      removeItem: (slug, optionId) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.slug === slug && i.optionId === optionId),
          ),
        })),

      // ... 나머지 함수들은 그대로 두세요 ...
      updateQuantity: (slug, optionId, adults, children) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.slug === slug && item.optionId === optionId
              ? {
                  ...item,
                  adults,
                  children,
                  totalPrice: (adults + children) * item.pricePerPerson,
                }
              : item,
          ),
        })),

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        const state = get();
        return state.items.reduce(
          (sum, item) => sum + item.adults + item.children,
          0,
        );
      },

      getTotalPrice: () => {
        const state = get();
        return state.items.reduce((sum, item) => sum + item.totalPrice, 0);
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);
