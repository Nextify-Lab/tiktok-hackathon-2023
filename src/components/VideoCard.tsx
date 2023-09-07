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
import ViewItem from "./ShopFlow/ViewItem";

export const FOOD_ITEM_IMAGE_URL =
  "https://down-sg.img.susercontent.com/file/sg-50009109-03c9dd04fc67ab4a70690002b6ebefca";
export const FOOD_ITEM_TITLE =
  "CHEAPEST SELF HEATING RICE🔥 这味香 15 Mins Flavour Rice";
export const FOOD_ITEM_PRICE = "2.49";
export const FOOD_ITEM_DESC = `
1. Stir Fried Meat With Fungus 鱼香肉丝 - Round Packaging
2. Curry Chicken 咖喱鸡肉 - Round Packaging
3. Sour Vege Meat 酸菜肉丝 - Round Packaging
4. Stir Fried Meat With Fungus 鱼香肉丝 - Square Packaging
`;

const handleGroupBuyPopupClick = (
  setIsViewingItemPanel: Dispatch<SetStateAction<boolean>>
) => {
  setIsViewingItemPanel(true);
};
const VideoCard = (props: {
  url: any;
  username: any;
  description: any;
  song: any;
  likes: any;
  shares: any;
  comments: any;
  saves: any;
  profilePic: any;
  setVideoRef: any;
  autoplay: any;
}) => {
  const {
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
  } = props;

  const [isViewingItemPanel, setIsViewingItemPanel] = useState(false);

  const videoRef = useRef(null);

  useEffect(() => {
    if (autoplay) {
      videoRef.current.play();
    }
  }, [autoplay]);

  const onVideoPress = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <div className={styles.video}>
      {isViewingItemPanel && (
        <ViewItem
          imageUrl={FOOD_ITEM_IMAGE_URL}
          title={FOOD_ITEM_TITLE}
          price={FOOD_ITEM_PRICE}
          description={FOOD_ITEM_DESC}
        />
      )}
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
        onClick={() => handleGroupBuyPopupClick(setIsViewingItemPanel)}
      />
      <div className={styles["bottom-controls"]}>
        <div className={styles["footer-left"]}>
          {/* The left part of the container */}
          <FooterLeft
            username={username}
            description={description}
            song={song}
          />
        </div>
        <div className={styles["footer-right"]}>
          {/* The right part of the container */}
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
