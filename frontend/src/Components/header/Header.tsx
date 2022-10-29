import React from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import { FaGasPump } from "react-icons/fa";

export default function Header() {
  return (
    <header className={styles.header}>
      <FaGasPump className={styles.pumpIcon} />
      <Link to="/" className={styles.headerNameLink}>
        DrivstoffNettsiden
      </Link>
    </header>
  );
}
