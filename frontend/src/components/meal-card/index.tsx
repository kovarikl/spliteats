import { Card } from "@/components/card";
import { Meal } from "@/data/restaurants";
import { useOrderStore } from "@/stores/order";
import {
    Button,
    Card as ChakraCard,
    Flex,
    HStack,
    Image,
    Text,
} from "@chakra-ui/react";

const MealCard = ({ meal }: { meal: Meal }) => {
    const { name, description, price } = meal;

    const add = useOrderStore((state) => state.add);
    const remove = useOrderStore((state) => state.remove);
    const order = useOrderStore((state) => state.order);
    const uniqueId = `${meal.restaurantId}-${meal.id}`;
    const cartEntry = order.find((entry) => entry.id === uniqueId);
    console.log("Unique id",uniqueId);
    console.log("Cart Entry",cartEntry);
    console.log("Entry : ", order);
    const handleAdd = () => {
        add(meal, meal.restaurantId);
    };

    const handleRemove = () => {
        remove(meal);
    };

    return (
        <Card>
            <Image
                src="https://superherocooks.com/_next/image?url=https%3A%2F%2Fsuper-hero-cooks.s3.us-east-2.amazonaws.com%2Frecipe-images%2F1729058746414.webp&w=1080&q=75"
                alt={`${name}`}
                height={150}
            />
            <ChakraCard.Body gap="1" p={4}>
                <ChakraCard.Title>{name}</ChakraCard.Title>
                <ChakraCard.Description>{description}</ChakraCard.Description>
            </ChakraCard.Body>
            <ChakraCard.Footer
                justifyContent="space-between"
                alignItems="center"
                p={4}
            >
                <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight">
                    <Text as="span">{price} CZK</Text>
                </Text>

                {cartEntry ? (
                    <HStack>
                        <Button variant="outline" onClick={handleRemove}>
                            -
                        </Button>
                        <Flex minWidth={5} justifyContent="center">
                            <Text>{cartEntry.quantity}</Text>
                        </Flex>
                        <Button variant="solid" onClick={handleAdd}>
                            +
                        </Button>
                    </HStack>
                ) : (
                    <Button
                        variant="solid"
                        onClick={() => {
                            if (
                                order.length > 0 &&
                                order[0].meal.restaurantId !== meal.restaurantId
                            ) {
                                alert("You can only add meals from one restaurant at a time.");
                                return;
                            }
                            handleAdd();
                        }}
                    >
                        Add to cart
                    </Button>
                )}
            </ChakraCard.Footer>
        </Card>
    );
};

export { MealCard };

