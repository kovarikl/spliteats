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

        {order.find((entry) => entry.id === meal.id) ? (
          <HStack>
            <Button variant="outline" onClick={() => remove(meal)}>
              -
            </Button>
            <Flex minWidth={5} justifyContent="center">
              <Text>
                {order.find((entry) => entry.id === meal.id)?.quantity}
              </Text>
            </Flex>
            <Button variant="solid" onClick={() => add(meal)}>
              +
            </Button>
          </HStack>
        ) : (
          <Button variant="solid" onClick={() => add(meal)}>
            Add to cart
          </Button>
        )}
      </ChakraCard.Footer>
    </Card>
  );
};

export { MealCard };
