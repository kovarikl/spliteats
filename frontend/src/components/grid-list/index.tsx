import { Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RestaurantCard } from "../restaurant-card";
import { restaurants } from "@/data/restaurants";

const GridList = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await restaurants.getAllMetadata();
        setRestaurantList(data);
      } catch (err) {
        setError("Failed to fetch restaurants. Please try again.");
      }
    };
    fetchRestaurants();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
      <Grid templateColumns="repeat(3, 1fr)" gap="6">
        {restaurantList.map(({ id, name, categories, address, ratingAverage, priceCategory }) => (
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
