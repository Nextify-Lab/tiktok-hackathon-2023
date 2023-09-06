import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import styles from "./FooterLeft.module.css";

export default function FooterLeft(props) {
  const { username, description, song } = props;

  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerLeft}>
        <div className={styles.text}>
          <h3>@{username}</h3>
          <p>{description}</p>
          <div className={styles.ticker}>
            <FontAwesomeIcon icon={faMusic} style={{ width: "30px" }} />
            {/* eslint-disable-next-line jsx-a11y/no-distracting-elements */}
            {/* <marquee direction="left" scrollamount="20">
              <span>{song}</span>
            </marquee> */}
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
}
