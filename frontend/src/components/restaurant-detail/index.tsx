import { Card, HStack, Image, VStack, Text } from "@chakra-ui/react";
import { useRestaurantStore } from "@/stores/order";

const RestaurantDetail = () => {
  const restaurant = useRestaurantStore((state) => state.selectedRestaurant);

  if (!restaurant) {
    return <Text>Loading restaurant details...</Text>; // Placeholder while data is loading
  }

  return (
      <Card.Root
          shadow="lg"
          borderRadius="lg"
          border="none"
          overflow="hidden"
          mb="2rem"
      >
        <Card.Body gap="2" p={4}>
          <HStack alignItems="flex-start">
            <Image
                borderRadius="lg"
                height={56}
                width={56}
                src="https://cdn.apartmenttherapy.info/image/upload/v1644622714/k/Photo/Large%20Packages/2022-03-KESS-Tools/food-storage-glass-containers-horizontal.jpg"
                alt={`${restaurant.name} thumbnail`}
            />

            {/* Restaurant Details */}
            <VStack align="flex-start" spacing={2}>
              <Text fontSize="lg" fontWeight="bold">
                {restaurant.name}
              </Text>
              <Text color="gray.600">
                {restaurant.categories.join(", ")}
              </Text>
              <Text>{restaurant.address}</Text>
              <Text color="green.500" fontWeight="medium">
                Open Now {/* Maybe calculate dynamically opening hours here */}
              </Text>
            </VStack>
          </HStack>
        </Card.Body>
      </Card.Root>
  );
};

export { RestaurantDetail };
