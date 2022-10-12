import React, { useState } from 'react';
import styles from './sidebar.module.css';
import { BsFilterLeft } from "react-icons/bs";
import { BsCaretLeftFill } from "react-icons/bs";

type SidebarProps = {
    collapsed: boolean;
}

export default function SideBar({ collapsed }: SidebarProps) {

    const [ priceSliderValue, setPriceSliderValue ] = useState(400);
    const [ menuCollapse, setMenuCollapse] = useState(collapsed);

    const handlePriceSliderChange = (event: React.ChangeEvent<HTMLInputElement>)  => {
        setPriceSliderValue(event.target.valueAsNumber)
    }

    function closeMenu() {
        setMenuCollapse(true)
    }

    function showMenu() {
        setMenuCollapse(false)
    }

  return (
    <div className={styles.sideBar}>
    {menuCollapse 
     ? <BsFilterLeft className={styles.filterIcon} onClick={showMenu}/>
     : 
     <div className={styles.sideBarWrapper}>
        <div onClick={closeMenu} className={styles.sideBarHeader}>
                <h3>Filters</h3>
                <BsCaretLeftFill className={styles.closeIcon}/>
        </div>
        <div className={styles.sideBarSubHeader}>
            <h5>Filter by</h5>
            <button>Clear</button>
        </div>
        <div className={styles.sideBarMain}>
            <div className={styles.sideBarCategoryCheckBox}>
                <h5>Område</h5>
                <div className={styles.sideBarCategoryChoiceCheckBox}>
                    <input type="checkbox" id="agder" name="agder"/>
                    <label htmlFor="agder">Agder</label>
                    <span>320</span>
                </div>
                <div className={styles.sideBarCategoryChoiceCheckBox}>
                    <input type="checkbox" id="oslo" name="oslo"/>
                    <label htmlFor="oslo">Oslo</label>
                    <span>1502</span>
                </div>
                <div className={styles.sideBarCategoryChoiceCheckBox}>
                    <input type="checkbox" id="trondelag" name="trondelag"/>
                    <label htmlFor="trondelag">Trøndelag</label>
                    <span>301</span>
                </div>
                <div className={styles.sideBarCategoryChoiceCheckBox}>
                    <input type="checkbox" id="viken" name="viken"/>
                    <label htmlFor="viken">Viken</label>
                    <span>152</span>
                </div>
            </div> 
            <div className={styles.sideBarCategoryRange}>
                <h5>Pris</h5>
                <span>{priceSliderValue} kr</span>
                <input type="range" id="price" name="price" min="0" max="1000" value={priceSliderValue} onChange={handlePriceSliderChange}/>
            </div>
            <div className={styles.sideBarCategoryCheckBox}>
                    <h5>Kjøp eller leie</h5>
                    <div className={styles.sideBarCategoryChoiceCheckBox}>
                        <input type="checkbox" id="kjope" name="kjope"/>
                        <label htmlFor="kjope">Kjøpe</label>
                        <span>52</span>
                    </div>
                    <div className={styles.sideBarCategoryChoiceCheckBox}>
                        <input type="checkbox" id="leie" name="leie"/>
                        <label htmlFor="leie">Leie</label>
                        <span>15</span>
                    </div>
                </div>
        </div>
    </div>
    }
        
    </div>
  );
}
