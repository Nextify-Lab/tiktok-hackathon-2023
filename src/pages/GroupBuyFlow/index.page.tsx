import BottomSheetGroupBuyModifiedChild from "@/components/GroupBuyFlow/BottomSheetGroupBuyModifiedChild";
import QRCodeButton from "@/components/GroupBuyFlow/QRCodeButton";
import ShareButton from "@/components/GroupBuyFlow/ShareButton";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const SomePage: React.FC = () => {
  const [sheetTitle, setSheetTitle] = useState("");
  const [sheetDesc, setSheetDesc] = useState<"qr" | "share">("qr");
  const [isOpen, setIsOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState<string>(""); // initialize as empty string

  const router = useRouter();

  useEffect(() => {
    // This code will run only on the client side after the initial render
    setCurrentUrl(
      `${window.location.protocol}//${window.location.host}${router.asPath}`
    );
  }, [router.asPath]); // Recompute currentUrl whenever router.asPath changes

  const clickQRCode = () => {
    setIsOpen(true);
    setSheetDesc("qr");
    setSheetTitle("Please Scan Here");
  };

  const clickShare = () => {
    setIsOpen(true);
    setSheetDesc("share");
    setSheetTitle("Share Link");
  };

  const closeBottomSheet = () => {
    setIsOpen(false);
  };

  return (
    <Box>
      <QRCodeButton onClick={clickQRCode} />
      <ShareButton onClick={clickShare} />
      <BottomSheetGroupBuyModifiedChild
        isOpen={isOpen}
        onClose={closeBottomSheet}
        title={sheetTitle}
        desc={sheetDesc}
        currentUrl={currentUrl}
      />
      {/* Content for the bottom sheet */}
    </Box>
  );
};

export default SomePage;
