import React, {
  useRef,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import FooterLeft from "../components/FooterLeft";
import FooterRight from "../components/FooterRight";
import styles from "./VideoCard.module.css";
import GroupBuyPopup from "./ShopFlow/GroupBuyPopup";
import ViewItem from "./ShopFlow/ViewProduct";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
} from "@chakra-ui/react";
import { useUser } from "./userContext";

interface VideoCardProps {
  url: string;
  username: string;
  description: string;
  song: string;
  likes: number | string; // assuming likes can be a number or a formatted string
  shares: number;
  comments: number;
  saves: number;
  profilePic: string;
  setVideoRef: (video: HTMLVideoElement | null) => void;
  autoplay: boolean;
  productId: string;
  geolocation: { latitude: number | string; longitude: number | string } | null;
}

export const FOOD_ITEM_IMAGE_URL =
  "https://down-sg.img.susercontent.com/file/65f4739a073c03e90c7adc0765ae9aa1";
export const FOOD_ITEM_TITLE =
  "CHEAPEST SELF HEATING RICE🔥 这味香 15 Mins Flavour Rice";
export const FOOD_ITEM_PRICE = "2.49";
export const FOOD_ITEM_DESC = `
1. Stir Fried Meat With Fungus 鱼香肉丝 - Round Packaging
2. Curry Chicken 咖喱鸡肉 - Round Packaging
3. Sour Vege Meat 酸菜肉丝 - Round Packaging
4. Stir Fried Meat With Fungus 鱼香肉丝 - Square Packaging
`;
export const DELIVERY_FEE = 3;

const VideoCard: React.FC<VideoCardProps> = ({
  url,
  username,
  description,
  song,
  likes,
  shares,
  comments,
  saves,
  profilePic,
  setVideoRef,
  autoplay,
  productId,
  geolocation,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const router = useRouter();

  const [showPopup, setShowPopup] = useState(false);
  const { userId, setUserId } = useUser();

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [groupbuys, setGroupbuys] = useState<
    GroupBuyFE[] | GroupBuy[] | undefined
  >(undefined);
  const [numberOfPeople, setNumberOfPeople] = useState(0);

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

  useEffect(() => {
    const fetchGroupbuy = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/groupBuy/route?productId=${productId}`);
        const data: GroupBuyFE[] = await res.json();
        setGroupbuys(data);
        console.log(data);

        // change index of 0
        setNumberOfPeople(Object.keys(data[0].selections).length);

        setLoading(false);
        console.log("[productId].page.tsx set groupbuy as ", data);
      } catch (error) {
        console.error("Error in [productId].page.tsx", error);
      }
    };

    fetchGroupbuy();

    return () => {
      setGroupbuys(undefined);
    };
  }, [productId]);

  const handleGroupBuyPopupClick = () => {
    console.log("group buy popup clicked", productId);
    // todo: POST a new groupbuy
    // store the groupbuyId from the response
    if (
      Array.isArray(groupbuys) &&
      groupbuys.length > 0 &&
      typeof groupbuys[0].id !== "undefined"
    ) {
      const groupbuyId = groupbuys[0].id;
      // Use groupbuyId for your logic here...
      // then redirect to the groupbuy page
      router.push(`/product/${productId}?groupbuyId=${groupbuyId}`);
    } else {
      console.error(
        "groupbuys is not valid or doesn't have any items with an id."
      );
    }
  };

  const ConfirmPopup = ({ isOpen, onCancel, onConfirm }: any) => (
    <Modal isOpen={isOpen} onClose={onCancel} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Group Buy</ModalHeader>
        <ModalCloseButton
          onClick={() => {
            setShowPopup(false);
            router.push(`/`);
          }}
        />
        <ModalBody>Do you want to start a groupbuy?</ModalBody>
        <ModalFooter>
          <Button
            mr={3}
            backgroundColor="black"
            textColor="white"
            onClick={onCancel}
          >
            No
          </Button>
          <Button
            backgroundColor="#fe2c55"
            textColor="white"
            onClick={onConfirm}
          >
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  const handleFeaturedItemClick = () => {
    setShowPopup(true);
  };

  const handleCancel = () => {
    setShowPopup(false);
    router.push(`/product/${productId}`);
  };

  const handleConfirm = async () => {
    setShowPopup(false);

    // 1. GET request to /api/product/<productId>
    try {
      const productRes = await fetch(`/api/product/${productId}`);
      if (!productRes.ok) throw new Error("Failed to fetch product details.");

      const productData = await productRes.json();
      const { shopId } = productData;
      console.log("%cVideoCard.tsx line:205 shopId", "color: #007acc;", shopId);

      // 2. POST request to /api/groupBuy/route
      const groupBuyBody = {
        shopId: shopId,
        location: {
          longitude: geolocation?.longitude.toString(),
          latitude: geolocation?.latitude.toString(),
        },
      };

      const groupBuyRes = await fetch("/api/groupBuy/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(groupBuyBody),
      });

      if (!groupBuyRes.ok) throw new Error("Failed to initiate group buy.");

      const groupBuyData = await groupBuyRes.json();
      const { id } = groupBuyData;

      // 3. PUT request to api/groupBuy/<id>

      const putRes = await fetch(`/api/groupBuy/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          buyerId: userId,
          productId: productId,
          quantity: 1,
        }),
      });

      if (!putRes.ok) throw new Error("Failed to update group buy selection.");

      const putData = await putRes.json();

      // Redirect or perform other actions after all requests are successful
      router.push(`/product/${productId}?groupbuyId=${id}`);
    } catch (error) {
      console.error("Error in handleConfirm:", error);
    }
  };

  useEffect(() => {
    if (autoplay && videoRef.current) {
      videoRef.current.play();
    }
  }, [autoplay]);

  const onVideoPress = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };
  console.log("%cVideoCard.tsx line:268 userId", "color: #007acc;", userId);
  return (
    <div className={styles.video}>
      {/* The video element */}
      <video
        className={styles.player}
        onClick={onVideoPress}
        ref={(ref) => {
          videoRef.current = ref;
          setVideoRef(ref);
        }}
        loop
        src={url}
      ></video>
      <GroupBuyPopup
        moneySaved={DELIVERY_FEE - DELIVERY_FEE / numberOfPeople}
        nearbyNum={numberOfPeople}
        onClick={() => handleGroupBuyPopupClick()}
      />
      <div className={styles["bottom-controls"]}>
        <div className={styles["footer-left"]}>
          <Skeleton isLoaded={typeof product?.productName === typeof "string"}>
            <FooterLeft
              username={username}
              description={description}
              song={song}
              itemName={product?.productName!}
              handleFeaturedItemClick={() => handleFeaturedItemClick()}
            />
          </Skeleton>
        </div>
        <div className={styles["footer-right"]}>
          <FooterRight
            likes={likes}
            shares={shares}
            comments={comments}
            saves={saves}
            profilePic={profilePic}
          />
        </div>
      </div>
      <ConfirmPopup
        isOpen={showPopup}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default VideoCard;
