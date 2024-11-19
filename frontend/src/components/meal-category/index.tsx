import { Grid, Stack, Text, Separator, Box } from "@chakra-ui/react";
import { MealCard } from "@/components/meal-card";
import { useMemo } from "react";

const MealsWithCategories = ({ meals = [] }) => {
    const mealsByCategory = useMemo(() => {
        if (!meals || meals.length === 0) {
            return {};
        }

        return meals.reduce((acc, meal) => {
            if (!acc[meal.type]) {
                acc[meal.type] = [];
            }
            acc[meal.type].push(meal);
            return acc;
        }, {});
    }, [meals]);

    if (Object.keys(mealsByCategory).length === 0) {
        return <p>No meals available for this restaurant.</p>;
    }

    return (
        <Stack spacing={8}>
            {Object.entries(mealsByCategory).map(([category, categoryMeals], index) => (
                <Box key={index}>
                    <Text fontSize="2xl" fontWeight="bold" mb={4} color={"black"}>
                        {category}
                    </Text>
                    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                        {categoryMeals.map((meal, idx) => (
                            <MealCard key={idx} meal={meal} />
                        ))}
                    </Grid>
                    {index < Object.keys(mealsByCategory).length - 1 && <Separator mt={6} />}
                </Box>
            ))}
        </Stack>
    );
};

export { MealsWithCategories };
