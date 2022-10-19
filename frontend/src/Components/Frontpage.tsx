import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MainContent from "./MainContent";
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
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          <Sidebar collapsed={viewMatch} />
        </div>
        <MainContent />
      </div>
    </>
  );
}
