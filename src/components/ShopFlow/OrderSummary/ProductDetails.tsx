import React, { useState } from "react";
import { Flex, Box, Image, Button, Text } from "@chakra-ui/react";
import { FOOD_ITEM_IMAGE_URL } from "@/components/VideoCard";

interface ProductDetailsProps {
  stock: number;
  setStock: React.Dispatch<React.SetStateAction<number>>;
  shippingPrice: number;
  remainingStock: number;
  productPrice: number;
  productName: string;
  shopName: string;
}
const ProductDetails: React.FC<ProductDetailsProps> = ({
  stock,
  setStock,
  shippingPrice,
  remainingStock,
  productPrice,
  productName,
  shopName,
}) => {
  const money = shippingPrice; // Placeholder for shipping cost

  return (
    <Box p={4} boxShadow="md" borderWidth="1px" mb={4}>
      {/* First row - shop title */}
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        {shopName ? shopName : "Shop Name"}
      </Text>

      {/* Second row */}
      <Flex mb={4}>
        {/* Left column - item image */}
        <Image
          src={FOOD_ITEM_IMAGE_URL}
          alt="Item placeholder"
          boxSize="100px"
          mr={4}
        />

        {/* Right column - item details */}
        <Box flex="1">
          <Text mb={2} fontWeight="semibold">
            {productName}
          </Text>
          <Text mb={2}>Price: S${productPrice}</Text>
          <Text mb={2}>Remaining Stock: {remainingStock}</Text>
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
