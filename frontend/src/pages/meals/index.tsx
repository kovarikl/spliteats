import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRestaurantStore } from "@/stores/order";
import { RestaurantDetail } from "@/components/restaurant-detail";
import { MealCard } from "@/components/meal-card";
import "./index.css";
import {Grid} from "@chakra-ui/react";
import {Filters} from "@/components/filters";

const Meals = () => {
    const { restaurantId } = useParams();
    const selectRestaurant = useRestaurantStore((state) => state.selectRestaurant);
    const meals = useRestaurantStore((state) => state.meals);

    useEffect(() => {
        const fetchData = async () => {
            if (restaurantId) {
                await selectRestaurant(restaurantId);
            }
        };
        fetchData();
    }, [restaurantId, selectRestaurant]);

    if (meals.length === 0) {
        return <p>Loading meals...</p>;
    }

    return (
        <div className="meals">
            <RestaurantDetail />
            <div className="meals-list">
                <Filters />
                <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    {meals.map((meal, index) => (
                        <MealCard key={index} meal={meal} />
                    ))}
                </Grid>
            </div>
        </div>
    );
};

export { Meals };