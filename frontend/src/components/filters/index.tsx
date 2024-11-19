import { Card } from "@chakra-ui/react";
import { CheckboxGroup, Fieldset } from "@chakra-ui/react";
import { Checkbox } from "@/components/ui/checkbox";
import { useRestaurantStore } from "@/stores/order";

const Filters = () => {
    const categories = useRestaurantStore((state) => state.categories);
    const selectedCategories = useRestaurantStore((state) => state.selectedCategories);
    const updateFilters = useRestaurantStore((state) => state.updateFilters);

    const handleCheckboxGroupChange = (clickedCategory) => {

        // Toggle the selected category
        const updatedCategories = selectedCategories.includes(clickedCategory)
            ? selectedCategories.filter((category) => category !== clickedCategory)
            : [...selectedCategories, clickedCategory];

        updateFilters(updatedCategories);
    };

    return (
        <Card.Root shadow="lg" borderRadius="sm" border="none" overflow="hidden">
            <Card.Body gap="2">
                <Card.Title fontSize="1.6em">Filters</Card.Title>
                <Card.Description>
                    <Fieldset.Root>
                        <CheckboxGroup value={selectedCategories}>
                            <Fieldset.Content>
                                {categories.map((category) => (
                                    <Checkbox
                                        value={category}
                                        key={category}
                                        onChange={() => handleCheckboxGroupChange(category)}
                                    >
                                        {category}
                                    </Checkbox>
                                ))}
                            </Fieldset.Content>
                        </CheckboxGroup>
                    </Fieldset.Root>
                </Card.Description>
            </Card.Body>
        </Card.Root>
    );
};

export { Filters };