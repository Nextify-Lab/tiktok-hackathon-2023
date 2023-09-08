import React from "react";
import SkeletonBox from "../SkeletonBox";
import { Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface StoreItemCardProps {
  imageUrl: string;
  itemName: string;
  loading: boolean;
  productId: string;
}

const StoreItemCard: React.FC<StoreItemCardProps> = ({
  imageUrl,
  itemName,
  loading,
  productId,
}) => {
  const router = useRouter();
  return (
    <SkeletonBox
      key={productId}
      p={4}
      boxShadow="md"
      borderRadius="md"
      isLoading={loading}
      onClick={() => {
        router.push(`/product/${productId}`);
      }}
    >
      <Image src={imageUrl} alt={itemName} />
      <Text mt={2}>{itemName}</Text>
    </SkeletonBox>
  );
};

export default StoreItemCard;
