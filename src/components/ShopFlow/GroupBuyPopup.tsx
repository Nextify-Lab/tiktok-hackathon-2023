import React from "react";
import { Box, Stack, Text } from "@chakra-ui/react";
import ClosableBox from "./ClosableBox";

interface GroupBuyPopupProps {
  nearbyNum: Number;
  moneySaved: Number;
  onClick: () => void;
}

const GroupBuyPopup: React.FC<GroupBuyPopupProps> = ({
  nearbyNum,
  moneySaved,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      style={{ position: "absolute", top: "10px", right: "10px", zIndex: 10 }}
    >
      <ClosableBox closable={true}>
        <Stack direction={"column"}>
          <Text>
            {nearbyNum.toString()} people near you have placed orders.
          </Text>
          <Text>Save ${moneySaved.toString()} with ThriftTogether</Text>
        </Stack>
      </ClosableBox>
    </div>
  );
};

export default GroupBuyPopup;
