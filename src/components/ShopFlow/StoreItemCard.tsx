import React from "react";
import SkeletonBox from "../SkeletonBox";
import { Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface StoreItemCardProps {
  imageUrl: string;
  itemName: string;
  loading: boolean;
  itemId: string;
}

const StoreItemCard: React.FC<StoreItemCardProps> = ({
  imageUrl,
  itemName,
  loading,
  itemId,
}) => {
  const router = useRouter();
  return (
    <SkeletonBox
      key={itemId}
      p={4}
      boxShadow="md"
      borderRadius="md"
      isLoading={loading}
      onClick={() => {
        router.push(`/item/${itemId}`);
      }}
    >
      <Image src={imageUrl} alt={itemName} />
      <Text mt={2}>{itemName}</Text>
    </SkeletonBox>
  );
};

export default StoreItemCard;
