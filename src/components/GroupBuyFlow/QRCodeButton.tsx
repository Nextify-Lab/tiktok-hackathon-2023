import React from "react";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonProps } from "@chakra-ui/react";

const QRCodeButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button {...props} variant="icon" iconSpacing="0">
      <FontAwesomeIcon icon={faQrcode} />
    </Button>
  );
};

export default QRCodeButton;
