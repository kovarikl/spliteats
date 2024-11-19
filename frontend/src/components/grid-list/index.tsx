import { Grid } from "@chakra-ui/react";
import { RestaurantCard } from "@/components/restaurant-card";
import {useRestaurantStore} from "@/stores/order.ts";

const GridList = () => {
    // Subscribe to filteredRestaurants from the Zustand store
    const filteredRestaurants = useRestaurantStore((state) => state.filteredRestaurants);

    return (
        <Grid templateColumns="repeat(3, 1fr)" gap="6">
            {filteredRestaurants.map(({ id, name, categories, address, ratingAverage, priceCategory }) => (
                <RestaurantCard
                    key={id}
                    id={id}
                    name={name}
                    categories={categories}
                    address={address}
                    ratingAverage={ratingAverage}
                    priceCategory={priceCategory}
                />
            ))}
        </Grid>
    );
};

export { GridList };