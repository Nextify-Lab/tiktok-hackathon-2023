import React from "react";
import { Box, Center, IconButton, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="1000"
      bg="white"
      shadow="md"
    >
      <Box display="flex" alignItems="center">
        {/* Go Back Icon */}
        <IconButton
          aria-label="Go back"
          icon={<ArrowBackIcon />}
          variant="ghost"
          onClick={() => {
            /* you can add additional functionality here if needed */
            router.back();
          }}
        />

        {/* Centered Text */}
        <Center flex="1">
          <Text fontSize="xl" fontWeight={"bold"}>
            Order Summary
          </Text>
        </Center>

        {/* Empty space for symmetry. You can put additional components here if needed. */}
        <Box w="48px" />
      </Box>
    </Box>
  );
};

export default Header;
