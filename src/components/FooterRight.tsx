import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCircleCheck,
  faHeart,
  faCommentDots,
  faBookmark,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./FooterRight.module.css";

interface FooterRightProps {
  likes: string | number;
  comments: string | number; // If your comments are always numbers, just use 'number' as the type.
  saves: number;
  shares: number;
  profilePic?: string; // '?' indicates it's optional
}

function FooterRight({
  likes,
  comments,
  saves,
  shares,
  profilePic,
}: FooterRightProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [userAddIcon, setUserAddIcon] = useState<
    typeof faCirclePlus | typeof faCircleCheck | null
  >(faCirclePlus);

  const handleUserAddClick = () => {
    setUserAddIcon(faCircleCheck);
    setTimeout(() => {
      setUserAddIcon(null);
    }, 3000); // Change the delay time (in milliseconds) as needed
  };

  // Function to convert likes count to a number
  const parseLikesCount = (count: string | number) => {
    if (typeof count === "string") {
      if (count.endsWith("K")) {
        return parseFloat(count) * 1000;
      }
      return parseInt(count);
    }
    return count;
  };

  // Function to format likes count
  const formatLikesCount = (count: number) => {
    if (count >= 10000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count;
  };

  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  return (
    <div className={styles.footerRight}>
      <div className={styles.sidebarIcon}>
        {profilePic ? (
          <img
            src={profilePic}
            className={styles.userProfile}
            alt="Profile"
            style={{ width: "45px", height: "45px", color: "#616161" }}
          />
        ) : null}
        {userAddIcon && (
          <FontAwesomeIcon
            icon={userAddIcon}
            className={styles.userAdd}
            style={{ width: "15px", height: "15px", color: "#FF0000" }}
            onClick={handleUserAddClick}
          />
        )}
      </div>
      <div className={styles.sidebarIcon}>
        <FontAwesomeIcon
          icon={faHeart}
          style={{
            width: "25px",
            height: "25px",
            color: liked ? "#FF0000" : "white",
          }}
          onClick={handleLikeClick}
        />
        <p>{formatLikesCount(parseLikesCount(likes) + (liked ? 1 : 0))}</p>
      </div>
      <div className={styles.sidebarIcon}>
        <FontAwesomeIcon
          icon={faCommentDots}
          style={{ width: "35px", height: "35px", color: "white" }}
        />
        <p>{comments}</p>
      </div>
      <div className={styles.sidebarIcon}>
        {saved ? (
          <FontAwesomeIcon
            icon={faBookmark}
            style={{ width: "35px", height: "35px", color: "#ffc107" }}
            onClick={() => setSaved(false)}
          />
        ) : (
          <FontAwesomeIcon
            icon={faBookmark}
            style={{ width: "35px", height: "35px", color: "white" }}
            onClick={() => setSaved(true)}
          />
        )}
        <p>{saved ? saves + 1 : saves}</p>
      </div>
      <div className={styles.sidebarIcon}>
        <FontAwesomeIcon
          icon={faShare}
          style={{ width: "35px", height: "35px", color: "white" }}
        />
        <p>{shares}</p>
      </div>
      <div className={`${styles.sidebarIcon} ${styles.record}`}>
        <img
          src="https://static.thenounproject.com/png/934821-200.png"
          alt="Record Icon"
        />
      </div>
    </div>
  );
}

export default FooterRight;
