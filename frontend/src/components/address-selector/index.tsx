import { InputGroup } from "../ui/input-group";
import { Button, Input, VStack } from "@chakra-ui/react";
import { LuMapPin } from "react-icons/lu";
import {
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  DialogActionTrigger,
  DialogCloseTrigger,
  DialogFooter,
} from "../ui/dialog";
import { useState } from "react";

const AddressSelector = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState("");
  //  const [selectedLocation, setSelectedLocation] = useState(null);

  //  const { isLoaded } = useLoadScript({
  //    googleMapsApiKey: "", // Replace with your API key
  //  });

  //  const openModal = () => setIsOpen(true);
  //  const closeModal = () => setIsOpen(false);

  //  const handleMapClick = (event) => {
  //    setSelectedLocation({
  //      lat: event.latLng.lat(),
  //      lng: event.latLng.lng(),
  //    });
  //  };

  //  const handleConfirm = () => {
  //    console.log("Selected Address:", address || selectedLocation);
  //    closeModal();
  //  };

  // TODO: maybe leave input, add some autocomplete, modal on map
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
            // onFocus={(e) => e.stopPropagation()}
            // TODO: block inputing
          />
        </InputGroup>
        {/* <Button variant="outline" size="sm">
          Open Dialog
        </Button> */}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
        </DialogHeader>
        <DialogBody>
          {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p> */}
          <VStack gap={4}>
            <Input
              placeholder="Type address manually"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {/* <Box
              width="100%"
              height="300px"
              borderWidth="1px"
              borderRadius="md"
            >
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={{
                    width: "100%",
                    height: "100%",
                  }}
                  zoom={12}
                  center={{ lat: 48.8566, lng: 2.3522 }} // Default to Paris; replace as needed
                  onClick={handleMapClick}
                >
                  {selectedLocation && <Marker position={selectedLocation} />}
                </GoogleMap>
              ) : (
                <p>Loading map...</p>
              )}
            </Box> */}
          </VStack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button>Save</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export { AddressSelector };
