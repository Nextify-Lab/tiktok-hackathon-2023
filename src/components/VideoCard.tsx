import React, { useRef, useEffect } from "react";
import FooterLeft from "../components/FooterLeft";
import FooterRight from "../components/FooterRight";
import styles from "./VideoCard.module.css";

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
}

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
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

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
      <div className={styles["bottom-controls"]}>
        <div className={styles["footer-left"]}>
          <FooterLeft
            username={username}
            description={description}
            song={song}
          />
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
