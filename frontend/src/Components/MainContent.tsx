import React from "react";
import styles from "./maincontent.module.css";
import { BsSearch } from "react-icons/bs";

export default function MainContent() {
  return (
    <div className={styles.main}>
      <div className={styles.searchDiv}>
        <input type="text" placeholder="Search..."></input>
        <BsSearch className={styles.searchIcon} />
      </div>
    </div>
  );
}
