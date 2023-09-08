import React from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import { FaChevronRight, FaMapMarkerAlt } from "react-icons/fa"; // Importing FontAwesome icons

const BuyerDetails = () => {
  // Mocked user details
  const userName = "John Doe";
  const userAddress = "123 Main St, Springfield";
  const userPostalCode = "12345";

  return (
    <Flex p={4} boxShadow="md" borderWidth="1px" mb={4} alignItems="flex-start">
      {/* Leftmost column - Location Icon */}
      <Box mr={4}>
        <FaMapMarkerAlt size={24} />
      </Box>

      {/* Center column - User details */}
      <Box flex="1">
        <Text mb={1} fontWeight="bold">
          {userName}
        </Text>
        <Text mb={1}>{userAddress}</Text>
        <Text>{userPostalCode}</Text>
      </Box>

      {/* Right column - Chevron Icon */}
      {/* <Box ml={4}>
        <FaChevronRight size={24} />
      </Box> */}
    </Flex>
  );
};

export default BuyerDetails;
