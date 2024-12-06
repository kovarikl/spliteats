import { InputGroup } from "../ui/input-group";
import { Button, Input, VStack } from "@chakra-ui/react";
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
import { useState, ChangeEvent } from "react";

// Define the type for Nominatim suggestions
type NominatimSuggestion = {
  display_name: string;
  lat: string;
  lon: string;
};

const fetchSuggestions = async (query: string): Promise<NominatimSuggestion[]> => {
  const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query
      )}&format=json&addressdetails=1&limit=5&countrycodes=cz`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch suggestions");
  }
  return response.json();
};

const AddressSelector = () => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<NominatimSuggestion[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>("");

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setQuery(userInput);

    if (userInput.trim().length > 2) {
      try {
        const results = await fetchSuggestions(userInput);
        setSuggestions(results);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion: NominatimSuggestion) => {
    setSelectedAddress(suggestion.display_name);
    setQuery(suggestion.display_name);
    setSuggestions([]);
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
                value={selectedAddress}
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
                  onChange={handleInputChange}
              />
              <div
                  style={{
                    width: "100%",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    maxHeight: "200px",
                    overflowY: "auto",
                  }}
              >
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {suggestions.map((suggestion, index) => (
                      <li
                          key={index}
                          style={{
                            padding: "8px",
                            cursor: "pointer",
                            borderBottom: "1px solid #ddd",
                            backgroundColor: "#fff",
                            color: "#000",
                          }}
                          onClick={() => handleSelectSuggestion(suggestion)}
                          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
                          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
                      >
                        {suggestion.display_name}
                      </li>
                  ))}
                </ul>
              </div>
            </VStack>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button
                onClick={() => console.log("Selected Address:", selectedAddress)}
            >
              Save
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
  );
};

export { AddressSelector };
