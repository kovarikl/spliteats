import { DayOfWeek, Restaurant } from "@/data/restaurants";
import {
  Badge,
  Box,
  Card,
  Center,
  HStack,
  Image,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useMemo } from "react";

interface Props {
  restaurant?: Restaurant;
}

const RestaurantDetail = ({ restaurant }: Props) => {
  const openingHours: Record<DayOfWeek, [string, string][]> = useMemo(() => {
    if (!restaurant) {
      return {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
      };
    }

    const newHours: Record<DayOfWeek, [string, string][]> = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    };
    Object.entries(restaurant.openingHours as Record<DayOfWeek, string[]>).map(
      ([day, hours]) => {
        for (let i = 0; i < hours.length; i += 2) {
          if (!newHours[day as DayOfWeek]) {
            newHours[day as DayOfWeek] = [];
          }
          newHours[day as DayOfWeek].push([hours[i], hours[i + 1]]);
        }
      }
    );
    return newHours;
  }, [restaurant]);

  return (
    <Card.Root
      shadow="lg"
      borderRadius="lg"
      border="none"
      overflow="hidden"
      mb="2rem"
    >
      <Card.Body gap="2" p={4} minHeight={64}>
        {!restaurant && (
          <Center marginTop={20}>
            <Spinner size="xl" />
          </Center>
        )}
        {restaurant && (
          <HStack alignItems="flex-start">
            <Image
              borderRadius="lg"
              height={56}
              width={56}
              src="https://cdn.apartmenttherapy.info/image/upload/v1644622714/k/Photo/Large%20Packages/2022-03-KESS-Tools/food-storage-glass-containers-horizontal.jpg"
              alt={`${restaurant.name} thumbnail`}
            />

            <VStack align="flex-start">
              <HStack align="baseline">
                <Text fontSize="xl" fontWeight="bold">
                  {restaurant.name}
                </Text>
                <Text color="gray.600">{restaurant.address}</Text>
              </HStack>
              <HStack align="center" marginBottom={2}>
                {restaurant.categories.map((category, index) => (
                  <Badge key={index}>{category}</Badge>
                ))}
              </HStack>
            </VStack>

            <VStack align="flex-start" gap={0} marginLeft={10}>
              <Text fontWeight="medium">Opening Hours</Text>
              {Object.keys(restaurant.openingHours).map((day) => (
                <HStack align="flex-start" gap={0}>
                  <Box width={40}>
                    <Text key={`${day}-0`}>{day}</Text>
                  </Box>

                  {openingHours[day as DayOfWeek].map((hours, index) => (
                    <Text key={`${day}-1`} color="gray.600">
                      {index > 0 ? ", " : ""}
                      {hours[0]}: {hours[1]}
                    </Text>
                  ))}
                </HStack>
              ))}
            </VStack>
          </HStack>
        )}
      </Card.Body>
    </Card.Root>
  );
};

export { RestaurantDetail };
