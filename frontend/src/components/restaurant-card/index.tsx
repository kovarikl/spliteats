import { Link } from "react-router-dom";
import { Card } from "../card";
import {Badge, Card as ChakraCard, Image} from "@chakra-ui/react";
import {FaStar} from "react-icons/fa6";
import {FaDollarSign} from "react-icons/fa";


const RestaurantCard = ({ id, name, categories, address, ratingAverage, priceCategory }) => {
  return (
      <Link to={`/restaurant/${id}`}>
        <Card>
          <Image
              src="https://cdn.apartmenttherapy.info/image/upload/v1644622714/k/Photo/Large%20Packages/2022-03-KESS-Tools/food-storage-glass-containers-horizontal.jpg"
              alt={`${name} restaurant`}
              height={150}
          />
          <ChakraCard.Body gap="1">
            <ChakraCard.Title>{name}</ChakraCard.Title>
            <ChakraCard.Description>{address}</ChakraCard.Description>
          </ChakraCard.Body>
          <ChakraCard.Footer justifyContent="flex-end">
            {categories.map((category, index) => (
                <Badge key={index}>{category}</Badge>
            ))}
            <Badge><FaStar color="yellow"/>{ratingAverage}</Badge>
            <Badge> {Array.from({ length: priceCategory }).map((_, index) => (
                <FaDollarSign color="green" key={index} />))}</Badge>
          </ChakraCard.Footer>
        </Card>
      </Link>
  );
};

export { RestaurantCard };

