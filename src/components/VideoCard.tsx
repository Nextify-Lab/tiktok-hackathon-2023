import React, { useRef, useEffect } from "react";
import FooterLeft from "../components/FooterLeft";
import FooterRight from "../components/FooterRight";
import styles from "./VideoCard.module.css";

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
