import { Button, Card } from "@chakra-ui/react";

// TODO: consumes some "section list" with toggleable filters, radios, checkboxes, etc.
// TODO: keep position fixed on scroll
const Filters = () => {
  return (
    <Card.Root shadow="lg" borderRadius="lg" border="none" overflow="hidden">
      <Card.Body gap="2">
        <Card.Title fontSize="1.6em">Filters</Card.Title>
        <Card.Description>
          This is the card body. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Curabitur nec odio vel dui euismod fermentum.
          Curabitur nec odio vel dui euismod fermentum.
        </Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button variant="outline">View</Button>
        <Button>Join</Button>
      </Card.Footer>
    </Card.Root>
  );
};

export { Filters };
