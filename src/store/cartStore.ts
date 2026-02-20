import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface MeetingPoint {
  name: string;
  description?: string;
  images?: string[];
}

export interface CartItem {
  slug: string;
  title: string;
  image: string;
  optionId: string;
  optionName: string;
  adults: number;
  children: number;
  pricePerPerson: number;
  adultPrice: number; // ✅ 추가
  childPrice?: number; // ✅ 추가
  totalPrice: number;
  tourId: string;
  date: string;
  meetingPoints?: MeetingPoint[]; // ✅ 추가: 선택 가능한 미팅 포인트 목록
  meetingPoint?: string; // ✅ 추가: 유저가 선택한 미팅 포인트 이름
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (slug: string, optionId: string, date: string) => void;
  updateItemQuantity: (
    slug: string,
    optionId: string,
    date: string,
    type: "adults" | "children",
    delta: number,
  ) => void;
  // ✅ 추가: 미팅 포인트 선택
  updateMeetingPoint: (
    slug: string,
    optionId: string,
    date: string,
    meetingPoint: string,
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
          const existingIndex = state.items.findIndex(
            (i) =>
              i.slug === item.slug &&
              i.optionId === item.optionId &&
              i.date === item.date,
          );

          if (existingIndex !== -1) {
            const updated = [...state.items];
            const existingItem = updated[existingIndex];

            const newAdults = existingItem.adults + item.adults;
            const newChildren = existingItem.children + item.children;

            updated[existingIndex] = {
              ...existingItem,
              adults: newAdults,
              children: newChildren,
              totalPrice:
                (newAdults + newChildren) * existingItem.pricePerPerson,
            };
            return { items: updated };
          }
          return { items: [...state.items, item] };
        }),

      removeItem: (slug, optionId, date) =>
        set((state) => ({
          items: state.items.filter(
            (i) =>
              !(i.slug === slug && i.optionId === optionId && i.date === date),
          ),
        })),

      updateItemQuantity: (slug, optionId, date, type, delta) =>
        set((state) => ({
          items: state.items.map((item) => {
            if (
              item.slug === slug &&
              item.optionId === optionId &&
              item.date === date
            ) {
              const currentQty = item[type];
              const newQty = currentQty + delta;

              if (newQty < 0) return item;

              const updatedItem = { ...item, [type]: newQty };
              updatedItem.totalPrice =
                (updatedItem.adults + updatedItem.children) *
                updatedItem.pricePerPerson;

              return updatedItem;
            }
            return item;
          }),
        })),

      // ✅ 추가: 미팅 포인트 업데이트
      updateMeetingPoint: (slug, optionId, date, meetingPoint) =>
        set((state) => ({
          items: state.items.map((item) => {
            if (
              item.slug === slug &&
              item.optionId === optionId &&
              item.date === date
            ) {
              return { ...item, meetingPoint };
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
