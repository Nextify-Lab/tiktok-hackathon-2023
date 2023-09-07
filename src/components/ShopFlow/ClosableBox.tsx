import { Box, CloseButton } from "@chakra-ui/react";
import React, { useState } from "react";

interface ClosableBoxProps {
  children?: React.ReactNode;
  closable: Boolean;
}

const ClosableBox: React.FC<ClosableBoxProps> = ({ children, closable }) => {
  const [isClosed, setIsClosed] = useState(false);
  return (
    <Box
      position={"relative"}
      zIndex={1}
      margin={"20px"}
      padding={"10px"}
      paddingRight={"40px"}
      borderRadius={"sm"}
      backgroundColor={isClosed && closable ? "transparent" : "whiteAlpha.700"}
    >
      <Box display={isClosed && closable ? "none" : "unset"}>
        {children}
        {closable && (
          <CloseButton
            position={"absolute"}
            right={"0.5"}
            top={"0.5"}
            onClick={() => setIsClosed(true)}
          />
        )}
      </Box>
    </Box>
  );
};

export default ClosableBox;
