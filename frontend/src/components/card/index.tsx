import { Card as ChakraCard } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

const Card = ({ children }: Props) => {
  return (
    <ChakraCard.Root
      shadow="lg"
      borderRadius="lg"
      border="none"
      overflow="hidden"
      _hover={{
        shadow: "xl",
        transform: "scale(1.01)",
        transition: "all 0.5s",
      }}
    >
      {children}
    </ChakraCard.Root>
  );
};

export { Card };
