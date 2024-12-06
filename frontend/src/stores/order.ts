import { create } from "zustand";
import { Meal } from "@/data/restaurants";

interface OrderItem {
  id: string;
  meal: Meal;
  quantity: number;
}

interface OrderState {
  order: OrderItem[];
  restaurantId: string | null;
  add: (meal: Meal, restaurantId: string) => void;
  remove: (meal: Meal) => void;
  clear: () => void;
}

const useOrderStore = create<OrderState>()((set, get) => ({
  order: [],
  restaurantId: null,

  add: (meal: Meal, restaurantId: string) => {
    const currentRestaurantId = get().restaurantId;
    const uniqueId = `${restaurantId}-${meal.id}`;

    if (!currentRestaurantId) {
      set((state) => ({
        order: [...state.order, { id: uniqueId, meal, quantity: 1 }],
        restaurantId,
      }));
      return;
    }

    if (currentRestaurantId !== restaurantId) {
      alert("You can only add items from one restaurant at a time.");
      return;
    }

    if (get().order.some((i) => i.id === uniqueId)) {
      set((state) => ({
        order: state.order.map((i) =>
            i.id === uniqueId ? { ...i, quantity: i.quantity + 1 } : i
        ),
      }));
      return;
    }

    set((state) => ({
      order: [...state.order, { id: uniqueId, meal, quantity: 1 }],
    }));
  },


  remove: (meal: Meal) => {
    const { order } = get();
    const uniqueId = `${meal.restaurantId}-${meal.id}`;

    if (order.find((i) => i.id === uniqueId)?.quantity === 1) {
      set((state) => {
        const updatedOrder = state.order.filter((i) => i.id !== uniqueId);

        return {
          order: updatedOrder,
          restaurantId: updatedOrder.length === 0 ? null : state.restaurantId,
        };
      });
      return;
    }
    set((state) => ({
      order: state.order.map((i) =>
          i.id === uniqueId ? { ...i, quantity: i.quantity - 1 } : i
      ),
    }));
  },


  clear: () =>
      set({
        order: [],
        restaurantId: null,
      }),
}));

export { useOrderStore };
