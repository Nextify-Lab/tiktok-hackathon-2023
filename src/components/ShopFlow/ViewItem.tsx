// ViewItem.tsx
import {
  Box,
  Image,
  Text,
  Button,
  Stack,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
} from "@chakra-ui/react";
import { faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BottomSheetGroupBuyModifiedChild from "../GroupBuyFlow/BottomSheetGroupBuyModifiedChild";
import QRCodeButton from "../GroupBuyFlow/QRCodeButton";
import ShareButton from "../GroupBuyFlow/ShareButton";
import SkeletonBox from "../SkeletonBox";

interface ViewItemProps {
  imageUrl: string;
  title: string;
  price: string;
  description?: string;
  groupbuyId?: string;
  itemId: string;
}

const ViewItem: React.FC<ViewItemProps> = ({
  imageUrl,
  title,
  price,
  description,
  groupbuyId,
  itemId,
}) => {
  const [sheetTitle, setSheetTitle] = useState("");
  const [sheetDesc, setSheetDesc] = useState<"qr" | "share">("qr");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [currentUrl, setCurrentUrl] = useState<string>("");
  // const currentUrl = `${window.location.protocol}//${window.location.host}${router.asPath}`;

  useEffect(() => {
    setCurrentUrl(
      `${window.location.protocol}//${window.location.host}${router.asPath}`
    );
  }, [router.asPath]);

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

  const handleVisitShop = () => {
    router.push("/shop/someid");
  };

  const handleStartPayment = () => {
    router.push(`/item/${itemId}/payment`);
  };

  return (
    <Box>
      {/* Top Red Banner */}
      <Flex bg="red.500" p={4} alignItems="center">
        <FontAwesomeIcon
          icon={faArrowLeft}
          width={"50px"}
          height={"50px"}
          color="white"
          onClick={() => router.back()}
        />
        <Spacer />
        <Text color="white" fontSize="2xl" ml="4">
          TikTok Shop
        </Text>
        <Spacer />
      </Flex>
      <SkeletonBox
        isLoading={loading}
        borderWidth="1px"
        borderRadius="lg"
        padding="5"
        maxWidth="400px"
      >
        <Image src={imageUrl} alt={title} borderRadius="md" />
        <Text fontWeight="bold" fontSize="xl" mt="4">
          {title} {groupbuyId && <span>(Groupbuy Id: {groupbuyId})</span>}
        </Text>
        <Text color="green.500" fontSize="lg" fontWeight="semibold">
          ${price}
        </Text>
        <Stack
          direction="row"
          spacing={4}
          mt="4"
          bg={"red.500"}
          color={"white"}
          align={"center"}
          borderRadius={"md"}
        >
          <Text margin={"3"}>Groupbuy with friends </Text>
          <QRCodeButton onClick={clickQRCode} />
          <ShareButton onClick={clickShare} />
          <BottomSheetGroupBuyModifiedChild
            isOpen={isOpen}
            onClose={closeBottomSheet}
            title={sheetTitle}
            desc={sheetDesc}
            currentUrl={currentUrl}
          />
        </Stack>
        {description && <Text mt="4">{description}</Text>}
        <Stack direction="row" spacing={4} mt="6">
          <Button
            colorScheme="teal"
            variant="solid"
            flex="1"
            onClick={() => handleVisitShop()}
          >
            Visit Shop
          </Button>
          <Button
            colorScheme="red"
            variant="solid"
            flex="1"
            onClick={() => handleStartPayment()}
          >
            Buy Now
          </Button>
        </Stack>
      </SkeletonBox>
    </Box>
  );
};

export default ViewItem;
