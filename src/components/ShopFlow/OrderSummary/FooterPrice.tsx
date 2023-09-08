import React from "react";
import { Flex, Box, Button } from "@chakra-ui/react";

const FooterPrice = () => {
  const money = 100; // Just a placeholder value, you can determine this later

  return (
    <Flex
      position="sticky"
      bottom="0"
      left="0"
      right="0"
      flexDirection="column"
      bgColor="white"
      p={4}
      boxShadow="md"
    >
      <Flex justifyContent="space-between" fontWeight={"bold"}>
        <Box>Total</Box>
        <Box>S${money}</Box>
      </Flex>
      <Button
        mt={2}
        onClick={() => {
          // Your onClick logic here
        }}
      >
        Place order
      </Button>
    </Flex>
  );
};

export default FooterPrice;
