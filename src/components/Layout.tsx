import React from "react";
import BottomNavbar from "./BottomNavbar";
import TopNavbar from "./TopNavbar";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <TopNavbar />
        {children}
        <BottomNavbar />
      </div>
    </div>
  );
};

export default Layout;
