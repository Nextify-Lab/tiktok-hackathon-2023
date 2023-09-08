import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";

interface OrderSummaryProps {
  productPrice: number;
  shippingPrice: number;
}
const OrderSummary: React.FC<OrderSummaryProps> = ({
  productPrice,
  shippingPrice,
}) => {
  // Mocked values for now
  const subtotal = productPrice; // replace with the actual value later
  const shipping = shippingPrice; // replace with the actual value later
  const total = subtotal + shipping;

  if (!total) {
    return <Spinner />;
  }
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
