import { Box, Grid, HStack, Stack, Text } from "@chakra-ui/react";

import { AddressSelector } from "../address-selector";
import { AppLogo } from "../app-logo";
import { Avatar } from "../ui/avatar";
import { Cart } from "../cart";

interface Props {
  lightweight?: boolean;
}

// TODO: generate some accounts, randomly, maybe save to local/session storage
const AppBar = ({ lightweight }: Props) => {
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
            <Avatar name="Jon Doe" size="md" />
            <Stack gap="0">
              <Text fontWeight="medium">John Doe</Text>
              <Text color="fg.muted" textStyle="sm">
                john.doe@outlook.com
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
