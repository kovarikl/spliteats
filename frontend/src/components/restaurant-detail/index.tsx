import { Card, HStack, Image } from "@chakra-ui/react";

// TODO: image | types, name, params, reviews | opening hours
// TODO: can also maintain position on scroll
const RestaurantDetail = () => {
  return (
    <Card.Root
      shadow="lg"
      borderRadius="lg"
      border="none"
      overflow="hidden"
      mb="2rem"
    >
      <Card.Body gap="2" p={4}>
        <HStack>
          <Image
            borderRadius="lg"
            height={56}
            src="https://cdn.apartmenttherapy.info/image/upload/v1644622714/k/Photo/Large%20Packages/2022-03-KESS-Tools/food-storage-glass-containers-horizontal.jpg"
          />

          {/* TODO: name, types, params, reviews, ... | opening hours */}
        </HStack>
      </Card.Body>
      {/* <Card.Footer justifyContent="flex-end">
        <Button variant="outline">View</Button>
        <Button>Join</Button>
      </Card.Footer> */}
    </Card.Root>
  );
};

export { RestaurantDetail };
