import React from "react";
import styles from "./maincontent.module.css";
import { BsSearch } from "react-icons/bs";
import circleK  from '../Images/circleK.png';

export default function MainContent() {
  return (
    <div className={styles.main}>
      <div className={styles.searchDiv}>
        <input type="text" placeholder="Search..."></input>
        <BsSearch className={styles.searchIcon} />
      </div>
        <div className={styles.mainContent}>
          <div className={styles.cardStyle}>
            <div className={styles.imageDiv}>
              <img className={styles.cardStyleImage} src={circleK} alt="CirkleK logo" />
            </div>
            <div className={styles.cardInformation}>
              <div className={styles.cardAreaDiv}>
                <span className={styles.cardBrand}>Cirkle K</span>
                <span className={styles.cardArea}>Nidarvoll</span>
              </div>
              <div className={styles.cardPriceDiv}>
                <span className={styles.cardPrice}>18.87 kr</span>
              </div>
            </div>
          </div>
          <div className={styles.cardStyle}>
            <div className={styles.imageDiv}>
              <img className={styles.cardStyleImage} src={circleK} alt="CirkleK logo" />
            </div>
            <div className={styles.cardInformation}>
              <div className={styles.cardAreaDiv}>
                <span className={styles.cardBrand}>Cirkle K</span>
                <span className={styles.cardArea}>Nidarvoll</span>
              </div>
              <div className={styles.cardPriceDiv}>
                <span className={styles.cardPrice}>18.87 kr</span>
              </div>
            </div>
          </div>
          <div className={styles.cardStyle}>
            <div className={styles.imageDiv}>
              <img className={styles.cardStyleImage} src={circleK} alt="CirkleK logo" />
            </div>
            <div className={styles.cardInformation}>
              <div className={styles.cardAreaDiv}>
                <span className={styles.cardBrand}>Cirkle K</span>
                <span className={styles.cardArea}>Nidarvoll</span>
              </div>
              <div className={styles.cardPriceDiv}>
                <span className={styles.cardPrice}>18.87 kr</span>
              </div>
            </div>
          </div>
          <div className={styles.cardStyle}>
            <div className={styles.imageDiv}>
              <img className={styles.cardStyleImage} src={circleK} alt="CirkleK logo" />
            </div>
            <div className={styles.cardInformation}>
              <div className={styles.cardAreaDiv}>
                <span className={styles.cardBrand}>Cirkle K</span>
                <span className={styles.cardArea}>Nidarvoll</span>
              </div>
              <div className={styles.cardPriceDiv}>
                <span className={styles.cardPrice}>18.87 kr</span>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
