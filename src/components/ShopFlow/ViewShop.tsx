// pages/shop.js
import React, { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
  Image,
  Text,
  Skeleton,
  Badge,
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Tab,
  TabList,
  Tabs,
  Stack,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faComment,
  faSearch,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import SkeletonBox from "../SkeletonBox";
import { useRouter } from "next/router";
import StoreItemCard from "./StoreItemCard";
import useShop from "@/hooks/useShop";

interface ViewShopProps {
  shopId: string;
  groupbuyId?: string;
}

const ViewShop: React.FC<ViewShopProps> = ({ shopId, groupbuyId }) => {
  const { shop, loading } = useShop(shopId, true); // Use the custom hook
  console.log(shop);
  const products = shop?.products;
  console.log(products);
  const router = useRouter();

  return (
    <Box>
      {/* Top Red Banner */}
      <Flex bg="red.500" p={4} alignItems="center">
        <FontAwesomeIcon
          icon={faArrowLeft}
          width={"50px"}
          height={"50px"}
          color="white"
          onClick={() => router.back()}
        />
        <InputGroup ml={2} bg="gray.100" borderRadius="md">
          <InputLeftElement pointerEvents="none">
            <FontAwesomeIcon icon={faSearch} color="gray.500" />
          </InputLeftElement>
          <Input placeholder="Search shop" />
        </InputGroup>
      </Flex>

      {/* Shop Details */}
      <Flex bg="red.500" p={4} alignItems="center" color={"white"}>
        <SkeletonBox isLoading={loading}>
          <Image
            src="https://down-aka-sg.img.susercontent.com/27f4669aca265448b403ae04661b6a05_tn"
            borderRadius="full"
            boxSize="50px"
          />
        </SkeletonBox>
        <SkeletonBox ml={4} isLoading={loading}>
          <Text fontWeight="bold">{shop?.storeName}</Text>
          <Flex alignItems="center">
            <FontAwesomeIcon icon={faStar} color="yellow.400" />
            <Text ml={1}>{shop?.rating}</Text>
            <Badge ml={2} colorScheme="green">
              1000+ followers
            </Badge>
          </Flex>
        </SkeletonBox>
        <Spacer />
        <Stack>
          <Button
            leftIcon={<FontAwesomeIcon icon={faComment} />}
            variant="outline"
            size="sm"
            bg={"white"}
          >
            Chat
          </Button>
          <Button ml={2} colorScheme="teal" size="sm">
            Follow
          </Button>
        </Stack>
      </Flex>

      {/* Navigation Bar */}
      <Tabs variant="enclosed" isFitted>
        <TabList>
          <Tab>Shop</Tab>
          <Tab>Products</Tab>
          <Tab>Categories</Tab>
        </TabList>
      </Tabs>

      {/* Best Selling Products */}
      <Box p={4}>
        <Text fontWeight="bold" mb={4}>
          Best Selling
        </Text>
        <SimpleGrid columns={2} spacing={4}>
          {/* Display only the first 2 products as best selling for demo */}
          {products?.slice(0, 2).map((product, index) => (
            <StoreItemCard
              key={index}
              imageUrl={
                "https://down-sg.img.susercontent.com/file/65f4739a073c03e90c7adc0765ae9aa1"
              }
              itemName={product.productName}
              loading={loading}
              productId={product.id}
            />
          ))}
        </SimpleGrid>
      </Box>

      {/* All Products */}
      <Box p={4}>
        <Text fontWeight="bold" mb={4}>
          All Products
        </Text>
        <SimpleGrid columns={2} spacing={4}>
          {products?.map((product, index) => (
            <StoreItemCard
              key={index}
              imageUrl={
                "https://down-sg.img.susercontent.com/file/65f4739a073c03e90c7adc0765ae9aa1"
              }
              itemName={product.productName}
              loading={loading}
              productId={product.id}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default ViewShop;
