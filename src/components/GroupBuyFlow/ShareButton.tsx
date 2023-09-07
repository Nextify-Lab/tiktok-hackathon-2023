import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { Button, ButtonProps } from "@chakra-ui/react";

const ShareButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button variant="icon" iconSpacing="0" {...props}>
      <FontAwesomeIcon icon={faShareAlt} />
    </Button>
  );
};

export default ShareButton;
