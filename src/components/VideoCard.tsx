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
import { Skeleton } from "@chakra-ui/react";

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
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product | undefined>(undefined);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/product/${productId}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
        console.log("[productId].page.tsx set item as ", data);
      } catch (error) {
        console.error("Error in [productId].page.tsx", error);
      }
    };

    fetchProduct();

    return () => {
      setProduct(undefined);
    };
  }, [productId]);

  const handleGroupBuyPopupClick = () => {
    console.log("group buy popup clicked", productId);
    // todo: POST a new groupbuy
    // store the groupbuyId from the response
    const groupbuyId = "123";
    // then redirect to the groupbuy page
    router.push(`/product/${productId}?groupbuyId=${groupbuyId}`);
  };
  const handleFeaturedItemClick = () => {
    router.push(`/product/${productId}`);
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
        moneySaved={0.4}
        nearbyNum={8}
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
    </div>
  );
};

export default VideoCard;
