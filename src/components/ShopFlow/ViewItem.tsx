// ViewItem.tsx
import { Box, Image, Text, Button, Stack } from "@chakra-ui/react";
import React from "react";

interface ViewItemProps {
  imageUrl: string;
  title: string;
  price: string;
  description?: string;
  groupbuyId?: string;
}

const ViewItem: React.FC<ViewItemProps> = ({
  imageUrl,
  title,
  price,
  description,
  groupbuyId,
}) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" padding="5" maxWidth="400px">
      <Image src={imageUrl} alt={title} borderRadius="md" />
      <Text fontWeight="bold" fontSize="xl" mt="4">
        {title} {groupbuyId && <span>(Groupbuy Id: {groupbuyId})</span>}
      </Text>
      <Text color="green.500" fontSize="lg" fontWeight="semibold">
        ${price}
      </Text>
      {description && <Text mt="4">{description}</Text>}
      <Stack direction="row" spacing={4} mt="6">
        <Button colorScheme="teal" variant="solid" flex="1">
          Add to Cart
        </Button>
        <Button colorScheme="red" variant="solid" flex="1">
          Buy Now
        </Button>
      </Stack>
    </Box>
  );
};

export default ViewItem;
