import { RestaurantCard } from "@/components/restaurant-card";
import { RestaurantMetadata } from "@/data/restaurants";
import { Center, Container, Grid, Text } from "@chakra-ui/react";

interface Props {
  data: RestaurantMetadata[];
}

const RestaurantsList = ({ data }: Props) => {
  if (Object.keys(data).length === 0) {
    return (
      <Center>
        <Text>No restaurants available for this filters</Text>
      </Center>
    );
  }

  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" gap="6">
        {data.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </Grid>
      <Container height={160}></Container>
    </>
  );
};

export { RestaurantsList };
