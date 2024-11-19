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
  restaurants: [], // Full restaurant list
  filteredRestaurants: [], // Restaurants after applying filters
  categories: [], // Unique restaurant categories
  selectedCategories: [], // Currently selected filter categories

  // Set the full restaurant list and extract categories
  setRestaurants: (data) =>
      set({
        restaurants: data,
        filteredRestaurants: data,
        categories: Array.from(
            new Set(data.flatMap((restaurant) => restaurant.categories))
        ),
      }),

  // Update selected categories and filter restaurants
  updateFilters: (selectedCategories) =>
      set((state) => ({
        selectedCategories,
        filteredRestaurants: selectedCategories.length
            ? state.restaurants.filter((restaurant) =>
                restaurant.categories.some((category) =>
                    selectedCategories.includes(category)
                )
            )
            : state.restaurants,
      })),
}));

export { useOrderStore };
