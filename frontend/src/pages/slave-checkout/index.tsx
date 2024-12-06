import { useOrderStore } from "@/stores/order";
import {
    Box,
    Button,
    Checkbox,
    Container,
    Flex,
    Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SlaveCheckout = () => {
    const order = useOrderStore((state) => state.order);
    const [selectedMeals, setSelectedMeals] = useState<string[]>([]);
    const navigate = useNavigate();

    const handleSelectMeal = (mealId: string) => {
        if (selectedMeals.includes(mealId)) {
            setSelectedMeals(selectedMeals.filter((id) => id !== mealId));
        } else {
            setSelectedMeals([...selectedMeals, mealId]);
        }
    };

    const handlePay = () => {
        if (selectedMeals.length === 0) {
            alert("Please select at least one meal to pay.");
            return;
        }
        alert("Redirecting to payment gateway (simulation)...");
        navigate("/paygate"); // Simulate redirecting to a payment gateway
    };

    return (
        <Container>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
                Select Meals to Pay
            </Text>
            {order.map((item) => (
                <Flex key={item.id} alignItems="center" justifyContent="space-between" mb={4}>
                    <Checkbox
                        isChecked={selectedMeals.includes(item.id)}
                        onChange={() => handleSelectMeal(item.id)}
                    >
                        <Text>{item.meal.name}</Text>
                    </Checkbox>
                    <Text>{item.quantity}x</Text>
                    <Text>{item.meal.price * item.quantity} CZK</Text>
                </Flex>
            ))}
            <Box mt={4}>
                <Button
                    variant="solid"
                    colorScheme="teal"
                    onClick={handlePay}
                    isDisabled={selectedMeals.length === 0}
                >
                    Pay Selected Items
                </Button>
            </Box>
        </Container>
    );
};

export { SlaveCheckout };
