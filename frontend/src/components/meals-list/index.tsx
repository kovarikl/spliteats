import {
  Grid,
  Text,
  Separator,
  Box,
  Container,
  Center,
} from "@chakra-ui/react";
import { MealCard } from "@/components/meal-card";
import { useMemo } from "react";
import { Meal } from "@/data/restaurants";

interface Props {
  meals: Meal[];
}

const MealsList = ({ meals }: Props) => {
  const mealsByCategory = useMemo(() => {
    if (!meals || meals.length === 0) {
      return {};
    }

    return meals.reduce<Record<string, Meal[]>>((acc, meal) => {
      if (!acc[meal.type]) {
        acc[meal.type] = [];
      }
      acc[meal.type].push(meal);
      return acc;
    }, {});
  }, [meals]);

  if (Object.keys(mealsByCategory).length === 0) {
    return (
      <Center>
        <Text>No meals available for this restaurant or filters</Text>
      </Center>
    );
  }

  return (
    <>
      {Object.entries(mealsByCategory).map(
        ([category, categoryMeals], index, array) => (
          <Box key={category}>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              {category}
            </Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              {categoryMeals.map((meal) => (
                <MealCard key={meal.id} meal={meal} />
              ))}
            </Grid>
            {index < array.length - 1 && <Separator mt={6} />}
          </Box>
        )
      )}
      <Container height={160}></Container>
    </>
  );
};

export { MealsList };
