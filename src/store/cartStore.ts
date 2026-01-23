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
  removeItem: (slug: string, optionId: string) => void;
  // ✅ [수정됨] CartPage에서 사용하는 함수명과 로직으로 변경
  updateItemQuantity: (
    slug: string,
    optionId: string,
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

      removeItem: (slug, optionId) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.slug === slug && i.optionId === optionId),
          ),
        })),

      // ✅ [핵심 수정] +1, -1 버튼 기능 구현
      updateItemQuantity: (slug, optionId, type, delta) =>
        set((state) => ({
          items: state.items.map((item) => {
            // 해당 아이템 찾기
            if (item.slug === slug && item.optionId === optionId) {
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
