import { create } from "zustand";
import { Meal } from "@/data/restaurants";

interface OrderItem {
  mealId: string;
  restaurantId: string;
  meal: Meal;
  quantity: number;
}

interface OrderState {
  order: OrderItem[];
  orderId: string | null;
  splitCount: number;
  paidOwnPart: boolean;
  add: (meal: Meal) => void;
  remove: (meal: Meal) => void;

  setOrderId: (id: string) => void;
  setSplitCount: (count: number) => void;
  setPaidOwnPart: (paid: boolean) => void;

  clear: () => void;
}

const useOrderStore = create<OrderState>()((set, get) => ({
  order: [],
  orderId: null,
  splitCount: 1,
  paidOwnPart: false,

  add: (meal: Meal) => {
    const { order } = get();

    if (order.some((i) => i.restaurantId !== meal.restaurantId)) {
      alert("You can only add items from one restaurant at a time.");
      return;
    }

    if (
      order.some(
        (i) => i.mealId === meal.id && i.restaurantId === meal.restaurantId
      )
    ) {
      set((state) => ({
        order: state.order.map((i) =>
          i.mealId === meal.id && i.restaurantId === meal.restaurantId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      }));
      return;
    }

    set((state) => ({
      order: [
        ...state.order,
        {
          mealId: meal.id,
          restaurantId: meal.restaurantId,
          meal,
          quantity: 1,
        },
      ],
    }));
  },

  remove: (meal: Meal) => {
    const { order } = get();

    if (
      order.some(
        (i) => i.mealId === meal.id && i.restaurantId === meal.restaurantId
      )
    ) {
      set((state) => {
        const newOrder = state.order.map((i) =>
          i.mealId === meal.id && i.restaurantId === meal.restaurantId
            ? { ...i, quantity: i.quantity - 1 }
            : i
        );

        if (newOrder.every((e) => e.quantity === 0)) {
          return {
            order: [],
            orderId: null,
          };
        }

        return {
          order: newOrder,
        };
      });
      return;
    }

    set((state) => {
      const newOrder = state.order.filter(
        (i) => i.mealId !== meal.id && i.restaurantId !== meal.restaurantId
      );

      if (newOrder.every((e) => e.quantity === 0)) {
        return {
          order: [],
          orderId: null,
        };
      }

      return {
        order: newOrder,
      };
    });
  },

  setOrderId: (id) => set({ orderId: id }),

  setSplitCount: (count) => set({ splitCount: count }),

  setPaidOwnPart: (paid) => set({ paidOwnPart: paid }),

  clear: () =>
    set({
      order: [],
      orderId: null,
      splitCount: 1,
      paidOwnPart: false,
    }),
}));

export { useOrderStore, type OrderItem };
