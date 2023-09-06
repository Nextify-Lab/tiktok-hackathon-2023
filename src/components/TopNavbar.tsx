import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTv, faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./TopNavbar.module.css";

const TopNavbar = () => {
  return (
    <div className={styles.TopNavbar}>
      <FontAwesomeIcon icon={faTv} className={styles.icon} />
      <h2>
        Following | <span>For You</span>
      </h2>
      <FontAwesomeIcon icon={faSearch} className={styles.icon} />
    </div>
  );
};

export default TopNavbar;
