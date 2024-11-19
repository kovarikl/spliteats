import { create } from "zustand";

interface OrderItem {
  // TODO: meals
  id: string;
}

interface OrderState {
  order: OrderItem[];
  add: (item: OrderItem) => void;
  remove: (item: OrderItem) => void;
  clear: () => void;
}

const useOrderStore = create<OrderState>()((set) => ({
  order: [],
  add: (item: OrderItem) => set((state) => ({ order: [...state.order, item] })),
  remove: (item: OrderItem) =>
    set((state) => ({
      order: state.order.filter((i) => i.id !== item.id),
    })),
  clear: () => set({ order: [] }),
}));

export { useOrderStore };
