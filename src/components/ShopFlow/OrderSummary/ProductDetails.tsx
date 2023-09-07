import React, { useState } from "react";
import { Flex, Box, Image, Button, Text } from "@chakra-ui/react";

const ProductDetails = () => {
  const [stock, setStock] = useState(1);
  const money = 10; // Placeholder for shipping cost

  return (
    <Box p={4} boxShadow="md" borderWidth="1px" borderRadius="lg" mb={4}>
      {/* First row - shop title */}
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Shop Title
      </Text>

      {/* Second row */}
      <Flex mb={4}>
        {/* Left column - item image */}
        <Image
          src="https://via.placeholder.com/100"
          alt="Item placeholder"
          boxSize="100px"
          mr={4}
        />

        {/* Right column - item details */}
        <Box flex="1">
          <Text mb={2} fontWeight="semibold">
            Item Name
          </Text>
          <Text mb={2}>Price: S$price</Text>
          <Flex alignItems="center">
            <Button
              size="sm"
              onClick={() => setStock((prev) => Math.max(prev - 1, 0))}
            >
              -
            </Button>
            <Text mx={2}>{stock}</Text>
            <Button size="sm" onClick={() => setStock((prev) => prev + 1)}>
              +
            </Button>
          </Flex>
        </Box>
      </Flex>

      {/* Standard shipping */}
      <Flex justifyContent="space-between">
        <Text>Standard Shipping</Text>
        <Text>S${money}</Text>
      </Flex>
    </Box>
  );
};

export default ProductDetails;
