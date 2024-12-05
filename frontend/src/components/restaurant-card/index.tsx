import { RestaurantMetadata } from "@/data/restaurants";
import { Badge, Card as ChakraCard, HStack, Image } from "@chakra-ui/react";
import { FaDollarSign } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Card } from "../card";

interface Props {
  restaurant: RestaurantMetadata;
}

const RestaurantCard = ({ restaurant }: Props) => {
  const { id, name, address, categories, ratingAverage, priceCategory } =
    restaurant;

  return (
    <Link to={`/meals/${id}`}>
      <Card>
        <Image
          src="https://cdn.apartmenttherapy.info/image/upload/v1644622714/k/Photo/Large%20Packages/2022-03-KESS-Tools/food-storage-glass-containers-horizontal.jpg"
          alt={`${name} restaurant`}
          height={150}
        />
        <ChakraCard.Body gap="1" p={4}>
          <HStack alignItems="center" justifyContent="space-between">
            <ChakraCard.Title>{name}</ChakraCard.Title>
            <HStack gap={1}>
              <FaStar /> {ratingAverage}
            </HStack>
          </HStack>
          <ChakraCard.Description>
            <HStack alignItems="center" justifyContent="space-between">
              {address}
              <HStack gap={0}>
                {Array.from({ length: priceCategory }).map((_, index) => (
                  <FaDollarSign color="green" key={index} size={12} />
                ))}
              </HStack>
            </HStack>
          </ChakraCard.Description>
        </ChakraCard.Body>
        <ChakraCard.Footer justifyContent="flex-end" p={4}>
          {categories.map((category, index) => (
            <Badge key={index}>{category}</Badge>
          ))}
        </ChakraCard.Footer>
      </Card>
    </Link>
  );
};

export { RestaurantCard };
