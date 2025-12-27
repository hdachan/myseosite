import { create } from "zustand";
import { persist } from "zustand/middleware";

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
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (slug: string, optionId: string) => void;
  updateQuantity: (
    slug: string,
    optionId: string,
    adults: number,
    children: number
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
          // 중복 체크: 같은 상품 + 같은 옵션 있는지 확인
          const existingIndex = state.items.findIndex(
            (i) => i.slug === item.slug && i.optionId === item.optionId
          );

          if (existingIndex !== -1) {
            // 이미 있으면 수량만 증가
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

          // 없으면 새로 추가
          return { items: [...state.items, item] };
        }),

      removeItem: (slug, optionId) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.slug === slug && i.optionId === optionId)
          ),
        })),

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
              : item
          ),
        })),

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        const state = get();
        return state.items.reduce(
          (sum, item) => sum + item.adults + item.children,
          0
        );
      },

      getTotalPrice: () => {
        const state = get();
        return state.items.reduce((sum, item) => sum + item.totalPrice, 0);
      },
    }),
    {
      name: "cart-storage", // localStorage 키 이름
    }
  )
);
