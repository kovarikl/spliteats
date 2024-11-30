import {
  Box,
  Button,
  Container,
  HStack,
  IconButton,
  Separator,
  Text,
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

const Cart = () => {
  const order = useOrderStore((state) => state.order);
  const navigate = useNavigate();

  return (
    <PopoverRoot positioning={{ placement: "bottom-end" }}>
      <PopoverTrigger asChild>
        <IconButton aria-label="Cart" size="md">
          {/* TODO: number of items */}
          <LuShoppingCart />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          {/* TODO: restaurant name, then items */}
          {order.map((o, i) => (
            <Container key={o.id} p={0}>
              <HStack>
                <Box flex={1} marginRight={5}>
                  <Text>{o.meal.name}</Text>
                </Box>
                <Box marginRight={2}>
                  <Text color="gray.600">
                    {o.quantity} portion{o.quantity === 1 ? " " : "s"}
                  </Text>
                </Box>
                <Box>
                  <Text fontWeight={500}>{o.meal.price * o.quantity} CZK</Text>
                </Box>
                <Button size="2xs" variant="subtle">
                  -
                </Button>
              </HStack>
              <Separator marginTop={2} marginBottom={2} />
            </Container>
          ))}
          <HStack>
            <Text flex={1} fontWeight={700}>
              Total
            </Text>
            <Text fontWeight={700}>
              {order.reduce((acc, curr) => {
                return acc + curr.meal.price * curr.quantity;
              }, 0)}{" "}
              CZK
            </Text>
          </HStack>
        </PopoverBody>
        <PopoverFooter justifyContent="flex-end" gap={2}>
          <Button variant="outline">Clear</Button>
          <Button onClick={() => navigate("/checkout")}>Checkout</Button>
        </PopoverFooter>
      </PopoverContent>
    </PopoverRoot>
  );
};

export { Cart };
