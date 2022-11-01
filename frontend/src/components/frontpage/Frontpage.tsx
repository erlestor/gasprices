import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import MainContent from "../mainContent/MainContent";
import Sidebar from "../sidebar/Sidebar";
import styles from "./frontpage.module.css";

export default function Frontpage() {
  const mql = window.matchMedia("(max-width: 1150px)");
  const [viewMatch, setViewMatch] = useState(mql.matches);

  useEffect(() => {
    function handleResize() {
      setViewMatch(mql.matches);
    }

    window.addEventListener("resize", handleResize);
  });

  return (
    <>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          <Sidebar collapsed={viewMatch} />
        </div>
        <MainContent />
      </div>
    </>
  );
}
