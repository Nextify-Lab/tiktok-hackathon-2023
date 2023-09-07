import React, { useState } from "react";
import BottomSheetGroupBuy from "./BottomSheetGroupBuy";
import QRCode from "qrcode.react";
import { Box, Button, IconButton, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaWhatsapp, FaTelegramPlane, FaQrcode } from "react-icons/fa";

interface BottomSheetModifiedChildProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  desc: "qr" | "share";
  currentUrl: string;
}

const BottomSheetModifiedChild: React.FC<BottomSheetModifiedChildProps> = ({
  isOpen,
  onClose,
  title,
  desc,
  currentUrl,
}) => {
  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${currentUrl}`, "_blank");
  };

  const handleTelegramShare = () => {
    window.open(
      `https://t.me/share/url?url=${currentUrl}&text=Check this out!`,
      "_blank"
    );
  };

  return (
    <BottomSheetGroupBuy isOpen={isOpen} onClose={onClose} title={title}>
      {desc === "qr" ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <QRCode value={currentUrl} />
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Button
            leftIcon={<FaWhatsapp />}
            m={2}
            width={"full"}
            bg={"green.500"}
            color={"white"}
            onClick={handleWhatsAppShare}
          >
            Share on WhatsApp
          </Button>
          <Button
            leftIcon={<FaTelegramPlane />}
            m={2}
            width={"full"}
            bg={"blue.500"}
            color={"white"}
            onClick={handleTelegramShare}
          >
            Share on Telegram
          </Button>
        </Box>
      )}
    </BottomSheetGroupBuy>
  );
};

export default BottomSheetModifiedChild;
