import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import styles from "./FooterLeft.module.css";

interface FooterLeftProps {
  username: string;
  description: string;
  song: string;
}

const FooterLeft: React.FC<FooterLeftProps> = ({
  username,
  description,
  song,
}) => {
  return (
    <div className={styles.footerContainer}>
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
