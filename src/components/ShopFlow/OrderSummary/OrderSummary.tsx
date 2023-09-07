import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const OrderSummary = () => {
  // Mocked values for now
  const subtotal = 100; // replace with the actual value later
  const shipping = 10; // replace with the actual value later
  const total = subtotal + shipping;

  return (
    <Box p={4} boxShadow="md" borderWidth="1px" mb={4}>
      {/* First Row */}
      <Text mb={3} fontWeight="bold" fontSize="xl">
        Order summary
      </Text>

      {/* Second Row */}
      <Flex justifyContent="space-between" mb={2}>
        <Text>Subtotal</Text>
        <Text>S${subtotal.toFixed(2)}</Text>
      </Flex>

      {/* Third Row */}
      <Flex justifyContent="space-between" mb={2}>
        <Text>Shipping</Text>
        <Text>S${shipping.toFixed(2)}</Text>
      </Flex>

      {/* Fourth Row */}
      <Flex justifyContent="space-between">
        <Text fontWeight="bold">Total</Text>
        <Text fontWeight="bold">S${total.toFixed(2)}</Text>
      </Flex>
    </Box>
  );
};

export default OrderSummary;
