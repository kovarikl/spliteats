import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRestaurantStore } from "@/stores/order";
import { RestaurantDetail } from "@/components/restaurant-detail";
import "./index.css";
import {Filters} from "@/components/filters";
import {MealsWithCategories} from "@/components/meal-category";

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
                <MealsWithCategories meals={meals} />
            </div>
        </div>
    );
};

export { Meals };