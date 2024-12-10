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
import { Group, Button, Text, VStack } from "@chakra-ui/react";
import { AppBar } from "@/components/app-bar";
import { useParams } from "react-router-dom";
import { CheckoutDelivery } from "@/components/checkout-delivery";
import { CheckoutSplitCount } from "@/components/checkout-splitcount";
import { CheckoutPay } from "@/components/checkout-pay";
import { useState } from "react";
import { CheckoutComplete } from "@/components/checkout-complete";
import { useOrderStore } from "@/stores/order";

const Checkout = () => {
  const { orderId } = useParams();
  const clear = useOrderStore((state) => state.clear);

  const [step, setStep] = useState(0);

  const handleOrderComplete = () => {
    setStep(3);
    clear();
  };

  return (
    <div className="checkout">
      <AppBar lightweight />
      <PageWrapper>
        <VStack alignItems="start">
          <Text fontSize="2xl" fontWeight="bold" color="black">
            Checkout
          </Text>
          <StepsRoot
            count={3}
            step={step}
            onStepChange={(step) => setStep(step.step)}
          >
            <StepsList>
              <StepsItem index={0} title="Delivery Details" />
              <StepsItem index={1} title="Split Count" />
              <StepsItem index={2} title="Select Meals and Pay" />
            </StepsList>

            <StepsContent index={0}>
              <CheckoutDelivery />
            </StepsContent>

            <StepsContent index={1}>
              <CheckoutSplitCount />
            </StepsContent>

            <StepsContent index={2}>
              <CheckoutPay
                orderId={orderId ?? ""}
                onOrderComplete={handleOrderComplete}
              />
            </StepsContent>

            <StepsCompletedContent>
              <CheckoutComplete />
            </StepsCompletedContent>

            <Group justifyContent="end">
              {step === 1 && (
                <StepsPrevTrigger asChild>
                  <Button variant="outline">Back</Button>
                </StepsPrevTrigger>
              )}
              {(step === 0 || step === 1) && (
                <StepsNextTrigger asChild>
                  <Button variant="solid">Next</Button>
                </StepsNextTrigger>
              )}
            </Group>
          </StepsRoot>
        </VStack>
      </PageWrapper>
    </div>
  );
};

export { Checkout };
