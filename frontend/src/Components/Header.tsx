import React from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const headernameLink = {
  marginLeft: "40px",
  textDecoration: "none",
  color: "black",
  fontSize: "18px",
};

const newElemementLink = {
  marginRight: "40px",
  textDecoration: "none",
  color: "blue",
};

export default function Header() {
  return (
    <div className={styles.header}>
      <Link to="/" style={headernameLink}>
        Headername
      </Link>
      <Link to="/addItem" style={newElemementLink}>
        Ny annonse
      </Link>
    </div>
  );
}
