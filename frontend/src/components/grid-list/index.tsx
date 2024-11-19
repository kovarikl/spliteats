import { Grid } from "@chakra-ui/react";
import { RestaurantCard } from "../restaurant-card";

const mockData = [
  { name: "Item 1", description: "Description 1" },
  { name: "Item 2", description: "Description 2" },
  { name: "Item 3", description: "Description 3" },
  { name: "Item 4", description: "Description 4" },
  { name: "Item 5", description: "Description 5" },
  { name: "Item 6", description: "Description 6" },
  { name: "Item 7", description: "Description 7" },
  { name: "Item 8", description: "Description 8" },
  { name: "Item 9", description: "Description 5" },
  { name: "Item 10", description: "Description 6" },
  { name: "Item 11", description: "Description 7" },
  { name: "Item 12", description: "Description 8" },
  { name: "Item 13", description: "Description 5" },
  { name: "Item 14", description: "Description 6" },
  { name: "Item 15", description: "Description 7" },
];

// TODO: consume correct cards
const GridList = () => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap="6">
      {mockData.map((_, index) => (
        <RestaurantCard key={index} />
      ))}
    </Grid>
  );
};

export { GridList };
