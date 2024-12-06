import "./index.css";
import { PageWrapper } from "@/components/page-wrapper";
import {
  StepsCompletedContent,
  StepsContent,
  StepsItem,
  StepsList,
  StepsNextTrigger,
  StepsPrevTrigger,
  StepsRoot,
} from "@/components/ui/steps";
import { Group, Button, Flex, Input, Text, Box } from "@chakra-ui/react";
import { AppBar } from "@/components/app-bar";
import { useOrderStore } from "@/stores/order";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const order = useOrderStore((state) => state.order);
  const remove = useOrderStore((state) => state.remove);
  const navigate = useNavigate();

  return (
      <div className="checkout">
        <AppBar lightweight />
        <PageWrapper>
          <Text fontSize="2xl" fontWeight="bold" mb={4} color="black">
            Checkout Process
          </Text>
          <StepsRoot count={3}>
            <StepsList>
              <StepsItem index={0} color="black" title="Delivery Details" />
              <StepsItem index={1} color="black" title="Select Meals" />
              <StepsItem index={2} color="black" title="Payment" />
            </StepsList>

            <StepsContent index={0}>
              <Text fontSize="lg" fontWeight="bold" mb={4} color="black">
                Enter your delivery details
              </Text>
              <Flex direction="column" gap={4} color="black">
                <Input placeholder="Full Name (placeholder)" />
                <Input placeholder="Address (placeholder)" />
                <Input placeholder="Phone Number (placeholder)" />
              </Flex>
            </StepsContent>

            <StepsContent index={1}>
              <Text fontSize="lg" fontWeight="bold" mb={4} color="black">
                Select Meals to Pay
              </Text>
              <Flex direction="column" gap={4}>
                {order.map((item) => (
                    <Flex
                        key={item.id}
                        justifyContent="space-between"
                        alignItems="center"
                        textAlign="center" // Ensure all text is centered
                    >
                      <Text color="black" flex="1">
                        {item.meal.name}
                      </Text>
                      <Text color="black" flex="1">
                        {item.quantity}x
                      </Text>
                      <Text color="black" flex="1">
                        {item.meal.price * item.quantity} CZK
                      </Text>
                      <Button
                          variant="outline"
                          size="sm"
                          colorScheme="red"
                          color="red"
                          onClick={() => remove(item.meal)}
                      >
                        Remove
                      </Button>
                    </Flex>
                ))}

                <Box my={4}>
                  <hr />
                </Box>

                <Flex justifyContent="space-between" alignItems="center">
                  <Text fontWeight="bold" flex="1" textAlign="left" color="black">
                    Total:
                  </Text>
                  <Text fontWeight="bold" flex="1" textAlign="right" color="black">
                    {order.reduce((total, item) => total + item.meal.price * item.quantity, 0)} CZK
                  </Text>
                </Flex>
              </Flex>
              <Box textAlign="center" mt={6}>
                <Button
                    size="lg"
                    colorScheme="teal"
                    onClick={() => navigate(`/slave-checkout/${order[0]?.id}`)}
                >
                  Share Payment (Link to Slave Checkout)
                </Button>
              </Box>
            </StepsContent>

            <StepsContent index={2}>
              <Text fontSize="lg" fontWeight="bold" mb={4} color="black">
                Payment
              </Text>
              <Button
                  variant="solid"
                  colorScheme="green"
                  onClick={() => alert("Payment simulated!")}
              >
                Pay Now
              </Button>
            </StepsContent>

            <StepsCompletedContent>
              <Text color="black">All steps are complete! Thank you for your order.</Text>
            </StepsCompletedContent>

            <Group>
              <StepsPrevTrigger asChild>
                <Button variant="outline" size="sm" color="black">
                  Prev
                </Button>
              </StepsPrevTrigger>
              <StepsNextTrigger asChild>
                <Button variant="solid" size="sm" color="black">
                  Next
                </Button>
              </StepsNextTrigger>
            </Group>
          </StepsRoot>
        </PageWrapper>
      </div>
  );
};

export { Checkout };
