import { useEffect } from "react";
import { Filters } from "@/components/filters";
import { GridList } from "@/components/grid-list";
import { PageHeadline } from "@/components/page-headline";
import { Search } from "@/components/search";
import { restaurants } from "@/data/restaurants";
import { Box } from "@chakra-ui/react";
import { useRestaurantStore} from "@/stores/order.ts";

const Restaurants = () => {
    const setRestaurants = useRestaurantStore((state) => state.setRestaurants);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const data = await restaurants.getAllMetadata();
                setRestaurants(data); // Initialize restaurant data in Zustand store
            } catch (err) {
                console.error("Error fetching restaurants:", err);
            }
        };
        fetchRestaurants();
    }, [setRestaurants]);


    return (
        <Box display="flex" gap="4">
            <Filters />
            <Box flex="1">
                <Search />
                <PageHeadline title="Restaurants" />
                <GridList/>
            </Box>
        </Box>
    );
};

export { Restaurants };
