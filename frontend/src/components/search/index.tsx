import { Input } from "@chakra-ui/react";
import { LuSearch, LuXCircle } from "react-icons/lu";

import { InputGroup } from "../ui/input-group";

interface Props {
  search: string | null;
  setSearch: (search: string | null) => void;
  placeholder?: string;
}

// TODO: search can also stay in place on scroll, when hit a certain point (top of browser)
const Search = ({ search, setSearch, placeholder }: Props) => {
  return (
    <InputGroup
      flex="1"
      startElement={<LuSearch size={20} />}
      endElement={
        search ? (
          <LuXCircle
            cursor="pointer"
            onClick={() => setSearch(null)}
            size={20}
          />
        ) : null
      }
      justifySelf="center"
    >
      <Input
        placeholder={placeholder ?? "Search ..."}
        size="lg"
        borderRadius="lg"
        value={search ?? ""}
        onChange={(e) => {
          const value = e.target.value;

          if (value.length) {
            setSearch(value);
          } else {
            setSearch(null);
          }
        }}
      />
    </InputGroup>
  );
};

export { Search };
