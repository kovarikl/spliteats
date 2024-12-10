import { Box, Grid, HStack, Stack, Text } from "@chakra-ui/react";

import { AddressSelector } from "../address-selector";
import { AppLogo } from "../app-logo";
import { Avatar } from "../ui/avatar";
import { Cart } from "../cart";
import { useAppStateStore } from "@/stores/appState";

interface Props {
  lightweight?: boolean;
}

const AppBar = ({ lightweight }: Props) => {
  const mockName = useAppStateStore((state) => state.name);

  return (
    <Box
      position="sticky"
      justifyContent="center"
      display="flex"
      top={0}
      zIndex={1000}
      backgroundColor={"white"}
      shadow="lg"
    >
      <Grid
        templateColumns={lightweight ? "1fr 1fr" : "1fr 1fr 1fr"}
        width={1440}
        height={70}
        alignItems="center"
        m="0 1em"
      >
        <AppLogo />
        {!lightweight && <AddressSelector />}
        <HStack justifySelf="end" gap={6}>
          <HStack gap="2">
            <Avatar name={`${mockName.name} ${mockName.surname}`} size="md" />
            <Stack gap="0">
              <Text fontWeight="medium">{`${mockName.name} ${mockName.surname}`}</Text>
              <Text color="fg.muted" textStyle="sm">
                {`${mockName.name.toLocaleLowerCase()}.${mockName.surname.toLocaleLowerCase()}`}
                @outlook.com
              </Text>
            </Stack>
          </HStack>

          {!lightweight && <Cart />}
        </HStack>
      </Grid>
    </Box>
  );
};

export { AppBar };
