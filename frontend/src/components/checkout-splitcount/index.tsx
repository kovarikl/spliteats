import { useOrderStore } from "@/stores/order";
import { Flex, VStack, Text } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { NumberInputField, NumberInputRoot } from "../ui/number-input";

const CheckoutSplitCount = () => {
  const setSplitCount = useOrderStore((state) => state.setSplitCount);
  const splitCount = useOrderStore((state) => state.splitCount);

  return (
    <Flex width="100%" justifyContent="center">
      <VStack width={600} alignItems="flexStart">
        <Text fontSize="lg" fontWeight="bold" mb={2} color="black">
          How many people are you splitting the bill with?
        </Text>
        <Flex direction="column" gap={4} color="black" width="100%">
          <Field label="Split Count" required>
            <NumberInputRoot
              width="100%"
              value={splitCount.toString()}
              min={1}
              onValueChange={(e) => setSplitCount(parseInt(e.value))}
            >
              <NumberInputField />
            </NumberInputRoot>
          </Field>
        </Flex>
      </VStack>
    </Flex>
  );
};

export { CheckoutSplitCount };
