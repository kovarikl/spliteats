import { useCallback, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RestaurantDetail } from "@/components/restaurant-detail";
import "./index.css";
import { Filters } from "@/components/filters";
import { MealsList } from "@/components/meals-list";
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from "@/components/ui/breadcrumb";
import { restaurants } from "@/data/restaurants";
import { useQuery } from "@tanstack/react-query";
import { Button, Center, HStack, Spinner } from "@chakra-ui/react";
import { Search } from "@/components/search";

const Meals = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const { data, error, isLoading } = useQuery({
    queryKey: ["restaurant", restaurantId],
    queryFn: () => restaurants.getRestaurant(restaurantId!),
  });

  const filters = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.meals.reduce<string[]>((acc, meal) => {
      if (!acc.includes(meal.type)) {
        acc.push(meal.type);
      }
      return acc;
    }, []);
  }, [data]);

  const filteredMeals = useMemo(() => {
    if (!data) {
      return [];
    }

    if (!activeFilters.length && !search) {
      return data.meals;
    }

    return data.meals.filter((meal) => {
      if (search && !meal.name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }

      if (activeFilters.length) {
        return activeFilters.includes(meal.type);
      }

      return true;
    });
  }, [data, search, activeFilters]);

  const handleFilterChange = useCallback(
    (filter: string) => {
      if (activeFilters.includes(filter)) {
        setActiveFilters((filters) => filters.filter((f) => f !== filter));
        return;
      }

      setActiveFilters((filters) => [...filters, filter]);
    },
    [activeFilters, setActiveFilters]
  );

  return (
    <div>
      <HStack p={0} marginBottom={2} justifyContent="space-between">
        <BreadcrumbRoot>
          <BreadcrumbLink
            onClick={() => navigate("/restaurants")}
            cursor="pointer"
          >
            Restaurants
          </BreadcrumbLink>
          <BreadcrumbCurrentLink>{data?.name}</BreadcrumbCurrentLink>
        </BreadcrumbRoot>

        <Button
          onClick={() => navigate("/restaurants")}
          size="sm"
          variant="outline"
        >
          Back to list
        </Button>
      </HStack>

      <RestaurantDetail restaurant={data} />

      <div className="meals">
        <Filters
          filters={filters}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onClearFilters={() => setActiveFilters([])}
        />
        <div className="list-view">
          <Search
            search={search}
            setSearch={setSearch}
            placeholder="Search meals ..."
          />
          {isLoading && (
            <Center marginTop={10}>
              <Spinner size="xl" />
            </Center>
          )}
          {!isLoading && !error && data && <MealsList meals={filteredMeals} />}
        </div>
      </div>
    </div>
  );
};

export { Meals };
