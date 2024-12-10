import { Card } from "@/components/card";
import { randomMealsImg } from "@/data/randomMealsImg";
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

  const cartEntry = order.find(
    (entry) =>
      entry.mealId === meal.id && entry.restaurantId === meal.restaurantId
  );

  const handleAdd = () => {
    add(meal);
  };

  const handleRemove = () => {
    remove(meal);
  };

  return (
    <Card>
      <Image src={randomMealsImg(meal.id)} alt={`${name}`} height={150} />
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

        {!!cartEntry?.quantity ? (
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
          <Button variant="solid" onClick={() => handleAdd()}>
            Add to cart
          </Button>
        )}
      </ChakraCard.Footer>
    </Card>
  );
};

export { MealCard };
