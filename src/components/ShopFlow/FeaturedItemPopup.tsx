import React from "react";
import { Box, Stack, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import ClosableBox from "./ClosableBox";

interface FeaturedItemPopupProps {
  itemName: String;
}

const FeaturedItemPopup: React.FC<FeaturedItemPopupProps> = ({ itemName }) => {
  return (
    <ClosableBox closable={false}>
      <Stack direction={"row"}>
        <FontAwesomeIcon
          icon={faBagShopping}
          bounce
          style={{ color: "#e69b19" }}
        />
        <Text>{itemName}</Text>
      </Stack>
    </ClosableBox>
  );
};

export default FeaturedItemPopup;
