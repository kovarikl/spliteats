import { InputGroup } from "../ui/input-group";
import { Button, Input, Spinner, VStack } from "@chakra-ui/react";
import { LuMapPin } from "react-icons/lu";
import {
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogRoot,
  DialogTrigger,
  DialogFooter,
  DialogActionTrigger,
  DialogCloseTrigger,
} from "../ui/dialog";
import { useState, useRef } from "react";
import { useAppStateStore } from "@/stores/appState";
import { useQuery } from "@tanstack/react-query";
import {
  getNominatimSuggestions,
  NominatimSuggestion,
} from "@/utils/getNominatimSuggestions";

const AddressSelector = () => {
  const selectedAddress = useAppStateStore((state) => state.deliveryAddress);
  const setSelectedAddress = useAppStateStore((state) => state.setAddress);
  const [query, setQuery] = useState<string>(selectedAddress ?? "");

  const { data, isLoading } = useQuery({
    queryKey: ["suggestion", query],
    queryFn: () => getNominatimSuggestions(query),
  });

  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleSelectSuggestion = (suggestion: NominatimSuggestion) => {
    setSelectedAddress(suggestion.display_name);

    if (buttonRef.current) {
      buttonRef.current.click();
    }

    setQuery(suggestion.display_name);
    sessionStorage.setItem("deliveryAddress", suggestion.display_name);
  };

  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <InputGroup
          flex="1"
          startElement={<LuMapPin size={18} />}
          justifySelf="center"
        >
          <Input
            placeholder="Select address ..."
            borderRadius="lg"
            width={400}
            variant="subtle"
            value={selectedAddress ?? ""}
            readOnly
          />
        </InputGroup>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search for an Address</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack gap={4}>
            <Input
              placeholder="Type an address"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {isLoading && <Spinner />}
            {data && !!data.length && (
              <div
                style={{
                  width: "100%",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {data.map((suggestion, index) => (
                    <li
                      key={index}
                      style={{
                        padding: "8px",
                        cursor: "pointer",
                        borderBottom:
                          index < data.length - 1 ? "1px solid #ddd" : "none",
                        backgroundColor: "#fff",
                        color: "#000",
                      }}
                      onClick={() => handleSelectSuggestion(suggestion)}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = "#f0f0f0")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = "#fff")
                      }
                    >
                      {suggestion.display_name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </VStack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" ref={buttonRef}>
              Cancel
            </Button>
          </DialogActionTrigger>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export { AddressSelector };
