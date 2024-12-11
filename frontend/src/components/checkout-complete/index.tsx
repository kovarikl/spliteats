import { VStack, Icon, Button, Text } from "@chakra-ui/react";
import { LuCheck } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

interface Props {
  withRedirect?: boolean;
}

const CheckoutComplete = ({ withRedirect = true }: Props) => {
  const navigate = useNavigate();

  return (
    <VStack mt={10}>
      <Icon fontSize="100px" color="green">
        <LuCheck />
      </Icon>
      <Text fontSize="2xl" fontWeight="bold" color="black">
        Thank you for your order!
      </Text>

      <Text color="black">
        Your order has been placed and payment has been received.
      </Text>

      {withRedirect && (
        <Button
          variant="solid"
          colorScheme="green"
          onClick={() => navigate("/")}
          mt={8}
        >
          Order More
        </Button>
      )}
    </VStack>
  );
};

export { CheckoutComplete };
