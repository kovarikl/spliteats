import { Link } from "react-router-dom";
import { Card } from "../card";
import { Badge, Card as ChakraCard, Image } from "@chakra-ui/react";

const RestaurantCard = () => {
  // TODO: restaurant id
  return (
    <Link to="/meals/id">
      <Card>
        <Image
          src="https://cdn.apartmenttherapy.info/image/upload/v1644622714/k/Photo/Large%20Packages/2022-03-KESS-Tools/food-storage-glass-containers-horizontal.jpg"
          height={150}
        />

        <ChakraCard.Body gap="1">
          <ChakraCard.Title>Restaurant name</ChakraCard.Title>
          <ChakraCard.Description>
            This is the card body. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Curabitur nec odio vel dui euismod fermentum.
            Curabitur nec odio vel dui euismod fermentum.
          </ChakraCard.Description>
        </ChakraCard.Body>
        <ChakraCard.Footer justifyContent="flex-end">
          <Badge>some</Badge>
          <Badge>badges</Badge>
          <Badge>attributes</Badge>
        </ChakraCard.Footer>
      </Card>
    </Link>
  );
};

export { RestaurantCard };
