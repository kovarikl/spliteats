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
import { useQuery } from "@tanstack/react-query";
import { restaurants } from "@/data/restaurants";
import { useCallback } from "react";
import { DELIVERY_FEE, SERVICE_FEE } from "@/utils/const";
import { createOrder } from "@/utils/createOrder";

const Cart = () => {
  const navigate = useNavigate();
  const order = useOrderStore((state) => state.order);
  const clear = useOrderStore((state) => state.clear);
  const setOrderId = useOrderStore((state) => state.setOrderId);
  const orderId = useOrderStore((state) => state.orderId);
  const remove = useOrderStore((state) => state.remove);
  const add = useOrderStore((state) => state.add);

  const { data } = useQuery({
    queryKey: ["restaurantMeta", order[order.length - 1]?.restaurantId ?? ""],
    queryFn: () =>
      restaurants.getRestaurant(order[order.length - 1]?.restaurantId ?? ""),
  });

  const handleCreateOrder = useCallback(async () => {
    const [response, data] = await createOrder(order);

    if (response.ok) {
      setOrderId(data.id);
      navigate(`/checkout/${data.id}`);
    } else {
      alert("Failed to create order");
    }
  }, [order, setOrderId, navigate]);

  return (
    <PopoverRoot positioning={{ placement: "bottom-end" }}>
      <PopoverTrigger asChild>
        <IconButton aria-label="Cart" size="md">
          <LuShoppingCart />
          <Box position="absolute" top={-2} right={-2}>
            {order.filter((o) => o.quantity > 0).length > 0 && (
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
          </Box>
        </IconButton>
      </PopoverTrigger>
      <PopoverContent width={450}>
        <PopoverArrow />
        <PopoverBody>
          {data && (
            <Text fontWeight="bold" mb={2}>
              Restaurant: {data.name}
            </Text>
          )}
          {order
            .filter((o) => o.quantity > 0)
            .map((o, i) => (
              <Container key={o.mealId} p={0}>
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
                    <Text fontWeight={500}>
                      {o.meal.price * o.quantity} CZK
                    </Text>
                  </Box>
                  <Button
                    size="2xs"
                    variant="subtle"
                    onClick={() => remove(o.meal)}
                  >
                    -
                  </Button>
                  <Button
                    size="2xs"
                    variant="solid"
                    onClick={() => add(o.meal)}
                  >
                    +
                  </Button>
                </HStack>
                {i < order.length - 1 && (
                  <Separator marginTop={2} marginBottom={2} />
                )}
              </Container>
            ))}

          {!!order.length && order.every((o) => o.quantity > 0) && (
            <>
              <HStack justifyContent="space-between" w="100%" mt={4}>
                <Text>Delivery Fee</Text>
                <Text>{DELIVERY_FEE} CZK</Text>
              </HStack>
              <HStack justifyContent="space-between" w="100%">
                <Text>Service Fee</Text>
                <Text>{SERVICE_FEE} CZK</Text>
              </HStack>
            </>
          )}

          <HStack mt={order.length > 0 ? 8 : 0}>
            <Text flex={1} fontWeight={700}>
              Total
            </Text>
            <Text fontWeight={700}>
              {order.reduce(
                (acc, curr) => acc + curr.meal.price * curr.quantity,
                0
              )}{" "}
              CZK
            </Text>
          </HStack>
        </PopoverBody>
        <PopoverFooter justifyContent="flex-end" gap={2}>
          <Button variant="outline" onClick={clear}>
            Clear
          </Button>
          <Button
            onClick={() =>
              orderId ? navigate(`/checkout/${orderId}`) : handleCreateOrder()
            }
            disabled={
              order.length === 0 || order.every((o) => o.quantity === 0)
            }
          >
            Checkout
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </PopoverRoot>
  );
};

export { Cart };
