import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";

const ShareButton: React.FC<{ link: string }> = ({ link }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Group Buy Link",
          url: link,
        });
      } catch (error) {
        console.error("Error sharing: ", error);
      }
    } else {
      console.error("Sharing not supported");
    }
  };

  return (
    <button onClick={handleShare}>
      <FontAwesomeIcon icon={faShareAlt} /> Share
    </button>
  );
};

export default ShareButton;
