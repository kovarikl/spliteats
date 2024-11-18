import { IconButton } from "@chakra-ui/react";
import { LuShoppingCart } from "react-icons/lu";

const Cart = () => {
  //   const order = useOrderStore((state) => state.order);

  return (
    // <PopoverRoot positioning={{ placement: "bottom-end" }}>
    //   <PopoverTrigger asChild>
    <IconButton aria-label="Search database" size="md">
      <LuShoppingCart />
    </IconButton>
    //   </PopoverTrigger>
    //   <PopoverContent>
    //     <PopoverArrow />
    //     <PopoverBody>Some content</PopoverBody>
    //   </PopoverContent>
    // </PopoverRoot>
  );
};

export { Cart };
