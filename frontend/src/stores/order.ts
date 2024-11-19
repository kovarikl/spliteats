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

export const useRestaurantStore = create((set) => ({
    restaurants: [],
    filteredRestaurants: [],
    categories: [],
    selectedCategories: [],
    setRestaurants: (data) => {
        set({
            restaurants: data,
            filteredRestaurants: data,
            categories: Array.from(
                new Set(data.flatMap((restaurant) => restaurant.categories))
            ),
        });
    },
    updateFilters: (selectedCategories) =>
        set((state) => {
            const filtered = selectedCategories.length
                ? state.restaurants.filter((restaurant) =>
                    restaurant.categories.some((category) =>
                        selectedCategories.includes(category)
                    )
                )
                : state.restaurants;
            return {
                selectedCategories,
                filteredRestaurants: filtered,
            };
        }),
}));


//For debugging useRestaurantStore in browser console
if (typeof window !== "undefined") {
    window.useRestaurantStore = useRestaurantStore;
}

export { useOrderStore };
