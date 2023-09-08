import React from "react";
import { Flex, Box, Button } from "@chakra-ui/react";
import { on } from "events";

interface FooterPriceProps {
  productPrice: number;
  onPayment: () => void;
}
const FooterPrice: React.FC<FooterPriceProps> = ({
  productPrice,
  onPayment,
}) => {
  return (
    <Flex
      position="sticky"
      bottom="0"
      left="0"
      right="0"
      flexDirection="column"
      bgColor="white"
      p={4}
      boxShadow="md"
    >
      <Flex justifyContent="space-between" fontWeight={"bold"}>
        <Box>Total</Box>
        <Box>S${productPrice}</Box>
      </Flex>
      <Button
        mt={2}
        onClick={() => {
          onPayment();
        }}
      >
        Place order
      </Button>
    </Flex>
  );
};

export default FooterPrice;
