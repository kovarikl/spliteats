import { Filters } from "@/components/filters";
import { PageHeadline } from "@/components/page-headline";
import { RestaurantsList } from "@/components/restaurants-list";
import { Search } from "@/components/search";
import { restaurants } from "@/data/restaurants";
import { useMemo } from "react";

import { useAppStateStore } from "@/stores/appState";
import { Center, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import "./index.css";

const Restaurants = () => {
  const restaurantsSearch = useAppStateStore((state) => state.restaurantSearch);
  const setSearch = useAppStateStore((state) => state.setRestaurantSearch);
  const activeFilters = useAppStateStore((state) => state.restaurantFilters);
  const toggleRestaurantFilter = useAppStateStore(
    (state) => state.toggleRestaurantFilter
  );
  const clearFilters = useAppStateStore(
    (state) => state.clearRestaurantFilters
  );

  const { data, error, isLoading } = useQuery({
    queryKey: ["restaurants"],
    queryFn: restaurants.getAllMetadata,
  });

  const filters = useMemo(() => {
    if (!data) {
      return [];
    }

    const categories = data.reduceRight<string[]>((acc, { categories }) => {
      categories.forEach((category) => {
        if (!acc.includes(category)) {
          acc.push(category);
        }
      });

      return acc;
    }, []);

    return categories;
  }, [data]);

  const filteredRestaurants = useMemo(() => {
    if (!data) {
      return [];
    }

    if (!activeFilters.length && !restaurantsSearch) {
      return data;
    }

    return data.filter((restaurant) => {
      if (
        restaurantsSearch &&
        !restaurant.name.toLowerCase().includes(restaurantsSearch.toLowerCase())
      ) {
        return false;
      }

      if (activeFilters.length) {
        return restaurant.categories.some((category) =>
          activeFilters.includes(category)
        );
      }

      return true;
    });
  }, [data, restaurantsSearch, activeFilters]);

  return (
    <div className="restaurants">
      <Filters
        filters={filters}
        activeFilters={activeFilters}
        onFilterChange={toggleRestaurantFilter}
        onClearFilters={clearFilters}
      />
      <div className="list-view">
        <Search
          search={restaurantsSearch}
          setSearch={setSearch}
          placeholder="Search restaurants ..."
        />
        <PageHeadline title="Restaurants" />
        {isLoading && (
          <Center marginTop={10}>
            <Spinner size="xl" />
          </Center>
        )}
        {!isLoading && !error && data && (
          <RestaurantsList data={filteredRestaurants} />
        )}
      </div>
    </div>
  );
};

export { Restaurants };
