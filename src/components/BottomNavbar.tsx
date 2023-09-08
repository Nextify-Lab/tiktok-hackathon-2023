import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUserFriends,
  faPlus,
  faInbox,
  fa7,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./BottomNavbar.module.css";
import { useRouter } from "next/router";
import { useUser } from "./userContext";

function BottomNavbar() {
  const { userId, setUserId } = useUser();

  const router = useRouter();
  return (
    <div className={styles["bottom-navbar"]}>
      <div className={styles["nav-item"]} onClick={() => router.push(`/`)}>
        <FontAwesomeIcon
          icon={faHouse}
          className={`${styles.icon} ${styles.active}`}
        />
        <span className={`${styles["item-name"]} ${styles.active}`}>Home</span>
      </div>
      <div className={styles["nav-item"]}>
        <FontAwesomeIcon icon={faUserFriends} className={styles.icon} />
        <span className={styles["item-name"]}>Friends</span>
      </div>
      <div className={styles["nav-item"]}>
        <FontAwesomeIcon
          icon={faPlus}
          className={`${styles.icon} ${styles.plus}`}
        />
        <span className={styles["item-name"]}>Create</span>
      </div>
      <div className={styles["nav-item"]}>
        <FontAwesomeIcon icon={fa7} className={styles.notification} />
        <FontAwesomeIcon icon={faInbox} className={styles.icon} />
        <span className={styles["item-name"]}>Inbox</span>
      </div>
      <div
        className={styles["nav-item"]}
        onClick={() => router.push(`/user/${userId}`)}
      >
        <FontAwesomeIcon icon={faUser} className={styles.icon} />
        <span className={styles["item-name"]}>Profile</span>
      </div>
    </div>
  );
}

export default BottomNavbar;
