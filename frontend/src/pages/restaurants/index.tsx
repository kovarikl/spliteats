import { useState, useEffect } from "react";
import { Filters } from "@/components/filters";
import { GridList } from "@/components/grid-list";
import { PageHeadline } from "@/components/page-headline";
import { Search } from "@/components/search";
import { restaurants } from "@/data/restaurants";
import { Box } from "@chakra-ui/react";

const Restaurants = () => {
    const [restaurantList, setRestaurantList] = useState([]);
    const [categories, setCategories] = useState([]); // Initialize with an empty array
    const [filteredList, setFilteredList] = useState([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const data = await restaurants.getAllMetadata();
                setRestaurantList(data);
                setFilteredList(data);

                // Extract unique categories
                const uniqueCategories = Array.from(
                    new Set(data.flatMap((restaurant) => restaurant.categories))
                );
                setCategories(uniqueCategories);
            } catch (err) {
                console.error("Error fetching restaurants:", err);
            }
        };
        fetchRestaurants();
    }, []);

    const handleFilterChange = (selectedCategories) => {
        if (!selectedCategories.length) {
            setFilteredList(restaurantList); // Show all if no filters are selected
        } else {
            setFilteredList(
                restaurantList.filter((restaurant) =>
                    restaurant.categories.some((category) =>
                        selectedCategories.includes(category)
                    )
                )
            );
        }
    };

    return (
        <Box display="flex" gap="4">
            <Filters categories={categories} onChange={handleFilterChange} />
            <Box flex="1">
                <Search />
                <PageHeadline title="Restaurants" />
                <GridList restaurants={filteredList} />
            </Box>
        </Box>
    );
};

export { Restaurants };