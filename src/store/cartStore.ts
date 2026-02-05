import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
  tourId: string;
  date: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  // 🚀 [수정 1] 삭제 시 날짜(date)도 받도록 변경
  removeItem: (slug: string, optionId: string, date: string) => void;
  // 🚀 [수정 2] 수량 변경 시 날짜(date)도 받도록 변경
  updateItemQuantity: (
    slug: string,
    optionId: string,
    date: string, // ✅ 추가됨
    type: "adults" | "children",
    delta: number,
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
          // 중복 체크: 상품 + 옵션 + 날짜까지 같아야 같은 상품으로 취급
          const existingIndex = state.items.findIndex(
            (i) =>
              i.slug === item.slug &&
              i.optionId === item.optionId &&
              i.date === item.date,
          );

          if (existingIndex !== -1) {
            const updated = [...state.items];
            const existingItem = updated[existingIndex];

            // 수량 합산
            const newAdults = existingItem.adults + item.adults;
            const newChildren = existingItem.children + item.children;

            updated[existingIndex] = {
              ...existingItem,
              adults: newAdults,
              children: newChildren,
              // 가격 재계산
              totalPrice:
                (newAdults + newChildren) * existingItem.pricePerPerson,
            };
            return { items: updated };
          }
          return { items: [...state.items, item] };
        }),

      // 🚀 [로직 수정] slug + optionId + date 3가지가 다 맞아야 삭제
      removeItem: (slug, optionId, date) =>
        set((state) => ({
          items: state.items.filter(
            (i) =>
              !(
                i.slug === slug &&
                i.optionId === optionId &&
                i.date === date // ✅ 날짜 조건 추가 (이제 다른 날짜 예약은 안 지워짐)
              ),
          ),
        })),

      // 🚀 [로직 수정] slug + optionId + date 3가지가 다 맞는 녀석만 수량 변경
      updateItemQuantity: (slug, optionId, date, type, delta) =>
        set((state) => ({
          items: state.items.map((item) => {
            // ✅ 날짜까지 확인 (다른 날짜 예약 건은 건드리지 않음)
            if (
              item.slug === slug &&
              item.optionId === optionId &&
              item.date === date
            ) {
              const currentQty = item[type];
              const newQty = currentQty + delta;

              // 0명 미만으로 내려가지 않게 방지
              if (newQty < 0) return item;

              // 성인/아동 수 변경
              const updatedItem = { ...item, [type]: newQty };

              // 총 가격 재계산 ( (성인+아동) * 단가 )
              updatedItem.totalPrice =
                (updatedItem.adults + updatedItem.children) *
                updatedItem.pricePerPerson;

              return updatedItem;
            }
            return item;
          }),
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
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
