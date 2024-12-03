import {
  Box,
  Button,
  Container,
  HStack,
  IconButton,
  Separator,
  Text,
  Badge,
} from "@chakra-ui/react";
import { LuShoppingCart } from "react-icons/lu";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverRoot,
  PopoverTrigger,
} from "../ui/popover";
import { useOrderStore } from "@/stores/order";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { restaurants } from "@/data/restaurants";

const Cart = () => {
  const order = useOrderStore((state) => state.order);
  const restaurantId = useOrderStore((state) => state.restaurantId);
  const clearOrder = useOrderStore((state) => state.clear);
  const removeItem = useOrderStore((state) => state.remove);
  const navigate = useNavigate();

  const [restaurantName, setRestaurantName] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurantName = async () => {
      if (restaurantId) {
        const restaurant = await restaurants.getRestaurantMetadata(restaurantId);
        setRestaurantName(restaurant.name);
      } else {
        setRestaurantName(null);
      }
    };

    fetchRestaurantName();
  }, [restaurantId]);

  return (
      <PopoverRoot positioning={{ placement: "bottom-end" }}>
        <PopoverTrigger asChild>
          <IconButton aria-label="Cart" size="md">
            <LuShoppingCart />
            {order.length > 0 && (
                <Badge
                    bg="red.500"
                    color="white"
                    fontSize="xs"
                    fontWeight="bold"
                    borderRadius="full"
                    px={2}
                    ml={1}
                >
                  {order.reduce((total, item) => total + item.quantity, 0)}
                </Badge>
            )}
          </IconButton>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            {restaurantName && (
                <Text fontWeight="bold" mb={2}>
                  Restaurant: {restaurantName}
                </Text>
            )}
            {order.map((o, i) => (
                <Container key={o.id} p={0}>
                  <HStack>
                    <Box flex={1} marginRight={5}>
                      <Text>{o.meal.name}</Text>
                    </Box>
                    <Box marginRight={2}>
                      <Text color="gray.600">
                        {o.quantity} portion{o.quantity === 1 ? "" : "s"}
                      </Text>
                    </Box>
                    <Box>
                      <Text fontWeight={500}>{o.meal.price * o.quantity} CZK</Text>
                    </Box>
                    <Button
                        size="2xs"
                        variant="subtle"
                        onClick={() => removeItem(o.meal)}
                    >
                      -
                    </Button>
                  </HStack>
                  {i < order.length - 1 && <Separator marginTop={2} marginBottom={2} />}
                </Container>
            ))}
            <HStack>
              <Text flex={1} fontWeight={700}>
                Total
              </Text>
              <Text fontWeight={700}>
                {order.reduce((acc, curr) => acc + curr.meal.price * curr.quantity, 0)} CZK
              </Text>
            </HStack>
          </PopoverBody>
          <PopoverFooter justifyContent="flex-end" gap={2}>
            <Button variant="outline" onClick={clearOrder}>
              Clear
            </Button>
            <Button
                onClick={() => navigate("/checkout")}
                isDisabled={order.length === 0}
            >
              Checkout
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </PopoverRoot>
  );
};

export { Cart };
