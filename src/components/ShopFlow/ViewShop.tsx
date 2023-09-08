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
import { products } from "../../../public/data";
import { Product } from "../../../public/data";
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

interface ViewShopProps {
  shopId: string;
  groupbuyId?: string;
}

const ViewShop: React.FC<ViewShopProps> = ({ shopId, groupbuyId }) => {
  const [shop, setShop] = useState<Shop | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  const fetchShop = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/shop/${shopId}`);
      const data = await res.json();
      setShop(data);
      console.log(shop);
      setLoading(false);

      if (data.error) {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error in ViewShop", error);
    }
  };

  useEffect(() => {
    fetchShop();

    return () => {
      setShop(undefined);
    };
  }, [shopId]);

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
          {products.slice(0, 2).map((product) => (
            <StoreItemCard
              key={product.id}
              imageUrl={product.imageUrl}
              itemName={product.name}
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
          {products.slice(2).map((product) => (
            <StoreItemCard
              key={product.id}
              imageUrl={product.imageUrl}
              itemName={product.name}
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
