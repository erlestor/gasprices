import React, { useEffect } from "react";
import styles from "./maincontent.module.css";
import { BsSearch } from "react-icons/bs";
import { useQuery } from "@apollo/client";
import { GET_GAS_STATIONS } from "../graphql/queries";
import { GasStation } from "../types";

export default function MainContent() {
  const { error, loading, data } = useQuery(GET_GAS_STATIONS);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <div className={styles.main}>
      <div className={styles.searchDiv}>
        <input type="text" placeholder="Search..."></input>
        <BsSearch className={styles.searchIcon} />
      </div>
    </div>
  );
}
