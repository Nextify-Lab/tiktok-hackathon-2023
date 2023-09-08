// ViewProduct.tsx
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
import { FOOD_ITEM_IMAGE_URL } from "../VideoCard";
import Link from "next/link";

interface ViewProductProps {
  groupbuyId?: string;
  productId: string;
}

const ViewProduct: React.FC<ViewProductProps> = ({ groupbuyId, productId }) => {
  const [sheetTitle, setSheetTitle] = useState("");
  const [sheetDesc, setSheetDesc] = useState<"qr" | "share">("qr");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product | undefined>(undefined);

  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/product/${productId}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
        console.log("[productId].page.tsx set product as ", data);
      } catch (error) {
        console.error("Error in [productId].page.tsx", error);
      }
    };

    fetchProduct();

    return () => {
      setProduct(undefined);
    };
  }, [productId]);

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
    router.push(`/shop/${product?.shopId}`);
  };

  const handleStartPayment = () => {
    router.push(`/product/${productId}/payment`);
  };

  return (
    <Flex minHeight="100vh" flexDirection={"column"}>
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
        <Link href={"/"}>
          <Text color="white" fontSize="2xl" ml="4">
            TikTok Shop
          </Text>
        </Link>
        <Spacer />
      </Flex>{" "}
      <SkeletonBox
        isLoading={loading}
        // borderWidth="1px"
        borderRadius="lg"
        padding="5"
        borderWidth="0"
      >
        <Image
          src={FOOD_ITEM_IMAGE_URL}
          alt={product?.productName}
          borderRadius="md"
        />
        <Text fontWeight="bold" fontSize="xl" mt="4">
          {product?.productName}{" "}
          {groupbuyId && <span>(Groupbuy Id: {groupbuyId})</span>}
        </Text>
        <Text color="green.500" fontSize="lg" fontWeight="semibold">
          ${product?.price}
        </Text>
        <Box flex="1" bg="white" />
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
        {product?.description && <Text mt="4">{product?.description}</Text>}
      </SkeletonBox>
      <Stack direction="row" spacing={4} mt="auto" mb="10" mx="5">
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
    </Flex>
  );
};

export default ViewProduct;
