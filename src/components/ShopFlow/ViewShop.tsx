// pages/shop.js
import React from "react";
import { Box, SimpleGrid, Image, Text } from "@chakra-ui/react";
import { products } from "../../../public/data";
import { Product } from "../../../public/data";

interface ViewShopProps {
  shopId: string;
  groupbuyId?: string;
}

const ViewShop: React.FC<ViewShopProps> = ({ shopId, groupbuyId }) => {
  // useEffect(() => {
  //     fetch('/api/')

  //   return () => {
  //     second
  //   }
  // }, [third])

  return (
    <Box p={4}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Shop Id: {shopId}
      </Text>
      {groupbuyId && (
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Groupbuy Id: {groupbuyId}
        </Text>
      )}
      <SimpleGrid columns={2} spacing={4}>
        {products.map((product: Product) => (
          <Box key={product.id} p={4} boxShadow="md" borderRadius="md">
            <Image src={product.imageUrl} alt={product.name} />
            <Text mt={2}>{product.name}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ViewShop;
