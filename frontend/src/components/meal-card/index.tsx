import { Badge, Image, Text, Button, HStack, Float} from "@chakra-ui/react";
import {Card as ChakraCard} from "@chakra-ui/react";
import {Card} from "@/components/card";
import {TbCurrencyKroneCzech} from "react-icons/tb";

const MealCard = ({ meal }) => {
    const { name, description, price, type } = meal;

    return (

        <Card>
            <Image
                src="https://superherocooks.com/_next/image?url=https%3A%2F%2Fsuper-hero-cooks.s3.us-east-2.amazonaws.com%2Frecipe-images%2F1729058746414.webp&w=1080&q=75"
                alt={`${name}`}
                height={150}
            />
            <ChakraCard.Body gap="2" >
                <Float placement="top-center"  offsetY="5">
                    <Badge variant="solid" size="lg">{type}</Badge>
                </Float>
                <ChakraCard.Title>{name}</ChakraCard.Title>
                <ChakraCard.Description>{description}</ChakraCard.Description>

                <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="1">
                    <HStack spacing={1}>
                        <Text as="span">{price}</Text>
                        <TbCurrencyKroneCzech color={"white"} />
                    </HStack>
                </Text>
            </ChakraCard.Body>
            <ChakraCard.Footer justifyContent="flex-end">
                <Button variant="solid">Add to cart</Button>
            </ChakraCard.Footer>
        </Card>


    );
};

export { MealCard };