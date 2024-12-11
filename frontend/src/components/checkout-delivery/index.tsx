import { useAppStateStore } from "@/stores/appState";
import { Flex, Input, Text, VStack } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { useState } from "react";

const CheckoutDelivery = () => {
  const name = useAppStateStore((state) => state.name);
  const deliveryAddress = useAppStateStore((state) => state.deliveryAddress);
  const setAddress = useAppStateStore((state) => state.setAddress);

  const [phone, setPhone] = useState<string>("");

  return (
    <Flex width="100%" justifyContent="center">
      <VStack width={600} alignItems="flexStart">
        <Text fontSize="lg" fontWeight="bold" mb={2} color="black">
          Enter your delivery details
        </Text>
        <Flex direction="column" gap={4} color="black" width="100%">
          <Field label="Full Name" required>
            <Input
              placeholder="Enter your full name"
              value={`${name.name} ${name.surname}`}
              contentEditable={false}
              onChange={() => {}}
            />
          </Field>
          <Field label="Delivery Address" required>
            <Input
              placeholder="Enter your delivery address"
              value={deliveryAddress ?? ""}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Field>
          <Field label="E-mail" required>
            <Input
              placeholder="Enter your e-mail"
              value={`${name.name.toLocaleLowerCase()}.${name.surname.toLocaleLowerCase()}@outlook.com`}
              contentEditable={false}
              onChange={() => {}}
            />
          </Field>
          <Field label="Phone number">
            <Input
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Field>
        </Flex>
      </VStack>
    </Flex>
  );
};

export { CheckoutDelivery };
