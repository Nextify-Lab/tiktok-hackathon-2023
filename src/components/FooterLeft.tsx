import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import styles from "./FooterLeft.module.css";
import FeaturedItemPopup from "./ShopFlow/FeaturedItemPopup";

interface FooterLeftProps {
  username: string;
  description: string;
  song: string;
  itemName: string;
  handleFeaturedItemClick: () => void;
}

const FooterLeft: React.FC<FooterLeftProps> = ({
  username,
  description,
  song,
  itemName,
  handleFeaturedItemClick,
}) => {
  return (
    <div className={styles.footerContainer}>
      <FeaturedItemPopup
        itemName={itemName}
        handleFeaturedItemClick={handleFeaturedItemClick}
      />
      <div className={styles.footerLeft}>
        <div className={styles.text}>
          <h3>@{username}</h3>
          <p>{description}</p>
          <div className={styles.ticker}>
            <FontAwesomeIcon icon={faMusic} style={{ width: "30px" }} />
            <div className={styles.scrollingTextContainer}>
              <div className={styles.scrollingText}>
                <span>{song}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterLeft;
