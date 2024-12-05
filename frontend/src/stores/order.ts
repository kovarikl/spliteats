import { create } from "zustand";
import { Meal } from "@/data/restaurants";

interface OrderItem {
  id: string;
  meal: Meal;
  quantity: number;
}

interface OrderState {
  order: OrderItem[];
  add: (meal: Meal) => void;
  remove: (meal: Meal) => void;
  clear: () => void;
}

const useOrderStore = create<OrderState>()((set, get) => ({
  order: [],
  add: (meal: Meal) => {
    if (get().order.some((i) => i.meal.id === meal.id)) {
      // bump up quantity
      set((state) => ({
        order: state.order.map((i) => {
          if (i.meal.id === meal.id) {
            return {
              ...i,
              quantity: i.quantity + 1,
            };
          }
          return i;
        }),
      }));

      return;
    }

    set((state) => ({
      order: [...state.order, { id: meal.id, meal, quantity: 1 }],
    }));
  },
  remove: (meal: Meal) => {
    if (get().order.find((i) => i.meal.id === meal.id)?.quantity === 1) {
      set((state) => ({
        order: state.order.filter((i) => i.meal.id !== meal.id),
      }));
      return;
    }

    set((state) => ({
      order: state.order.map((i) => {
        if (i.meal.id === meal.id) {
          return {
            ...i,
            quantity: i.quantity - 1,
          };
        }
        return i;
      }),
    }));
  },
  clear: () => set({ order: [] }),
}));

export { useOrderStore };
