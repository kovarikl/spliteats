import { InputGroup } from "../ui/input-group";
import { Input } from "@chakra-ui/react";
import { LuMapPin } from "react-icons/lu";

// TODO: with popover?
const AddressSelector = () => {
  return (
    <InputGroup flex="1" startElement={<LuMapPin />} justifySelf="center">
      <Input
        placeholder="Select address ..."
        borderRadius="lg"
        width={400}
        variant="subtle"
      />
    </InputGroup>
  );
};

export { AddressSelector };
