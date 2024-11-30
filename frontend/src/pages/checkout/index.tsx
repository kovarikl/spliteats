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
import { Group, Button } from "@chakra-ui/react";
import { AppBar } from "@/components/app-bar";

// TODO: slave checkout => only select meals and pay (dont need to be stepper)
// TODO: checkout header, nested stepper
const Checkout = () => {
  return (
    <div className="checkout">
      {/* TODO: remake */}
      <AppBar lightweight />
      <PageWrapper>
        <StepsRoot count={3}>
          <StepsList>
            <StepsItem index={0} title="Delivery details" />
            <StepsItem index={1} title="Select meals" />
            <StepsItem index={2} title="Payment" />
          </StepsList>

          <StepsContent index={0}>
            {/* TODO: address, name, ... => pre filled from user accound */}
            Step 1
          </StepsContent>
          <StepsContent index={1}>
            {/* TODO: show qr for shared payment session => link to slave checkout => and rename slave to smh else */}
            {/* TODO: list with meals, selecting of each meal to pay (including count) */}
            Step 2
          </StepsContent>
          <StepsContent index={2}>
            {/* TODO: simulate payment */}
            Step 3
          </StepsContent>
          <StepsCompletedContent>All steps are complete!</StepsCompletedContent>

          <Group>
            <StepsPrevTrigger asChild>
              <Button variant="outline" size="sm">
                Prev
              </Button>
            </StepsPrevTrigger>
            <StepsNextTrigger asChild>
              <Button variant="outline" size="sm">
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
