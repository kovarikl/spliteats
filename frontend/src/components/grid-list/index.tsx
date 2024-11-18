import { Grid } from "@chakra-ui/react";
import { RestaurantCard } from "@/components/restaurant-card";

const GridList = ({ restaurants }) => {
  return (
      <Grid templateColumns="repeat(3, 1fr)" gap="6">
        {restaurants.map(({ id, name, categories, address, ratingAverage, priceCategory }) => (
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