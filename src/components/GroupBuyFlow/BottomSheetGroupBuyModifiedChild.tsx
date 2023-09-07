import React from "react";
import BottomSheetGroupBuy from "./BottomSheetGroupBuy";
import QRCode from "qrcode.react";
import { Box, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";

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
          <IconButton
            m={2}
            aria-label="Share on WhatsApp"
            icon={<FaWhatsapp />}
            onClick={handleWhatsAppShare}
          />
          <IconButton
            m={2}
            aria-label="Share on Telegram"
            icon={<FaTelegramPlane />}
            onClick={handleTelegramShare}
          />
        </Box>
      )}
    </BottomSheetGroupBuy>
  );
};

export default BottomSheetModifiedChild;
