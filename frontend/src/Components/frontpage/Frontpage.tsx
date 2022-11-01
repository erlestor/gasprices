import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import MainContent from "../mainContent/MainContent";
import styles from "./frontpage.module.css";

export default function Frontpage() {
  return (
    <>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <MainContent />
      </div>
    </>
  );
}
