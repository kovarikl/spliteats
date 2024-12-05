import { create } from "zustand";

interface AppState {
  deliveryAddress: string | null;
  restaurantSearch: string | null;
  restaurantFilters: string[];

  setAddress: (deliveryAddress: string | null) => void;
  setRestaurantSearch: (restaurantSearch: string | null) => void;
  toggleRestaurantFilter: (filter: string) => void;

  clearAddress: () => void;
  clearRestaurantSearch: () => void;
  clearRestaurantFilters: () => void;
}

const useAppStateStore = create<AppState>()((set, get) => ({
  deliveryAddress: null,
  restaurantSearch: null,
  restaurantFilters: [],

  setAddress: (deliveryAddress: string | null) => set({ deliveryAddress }),
  setRestaurantSearch: (restaurantSearch: string | null) =>
    set({ restaurantSearch }),
  toggleRestaurantFilter: (filter: string) => {
    if (get().restaurantFilters.includes(filter)) {
      set((state) => ({
        restaurantFilters: state.restaurantFilters.filter((f) => f !== filter),
      }));
      return;
    }

    set((state) => ({
      restaurantFilters: [...state.restaurantFilters, filter],
    }));
  },

  clearAddress: () => set({ deliveryAddress: null }),
  clearRestaurantSearch: () => set({ restaurantSearch: null }),
  clearRestaurantFilters: () => set({ restaurantFilters: [] }),
}));

export { useAppStateStore };
