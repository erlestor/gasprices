import { useReactiveVar } from "@apollo/client";
import React, { useState } from "react";
import { BsCaretLeftFill, BsFilterLeft } from "react-icons/bs";
import { filterStateVar, resetFilterState } from "../../state/filterState";
import styles from "./sidebar.module.css";

export default function SideBar({ collapsed }: { collapsed: boolean }) {
  const [menuCollapse, setMenuCollapse] = useState(collapsed);
  const filterState = useReactiveVar(filterStateVar);

  const handlePriceSliderChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    filterStateVar({
      ...filterStateVar(),
      maxPrice: parseFloat(event.target.value),
    });
  };

  const handleCityChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const checked = e.target.checked;
    const city = e.target.value;

    if (checked) {
      filterStateVar({
        ...filterStateVar(),
        city,
      });
      return;
    }
  };

  const clearFilter = () => {
    resetFilterState();
  };

  return (
    <div
      className={styles.sideBar}
      style={{
        width: menuCollapse ? "fit-content" : "280px",
        minWidth: menuCollapse ? "0px" : "280px",
      }}
    >
      {menuCollapse ? (
        <BsFilterLeft
          className={styles.filterIcon}
          onClick={() => setMenuCollapse(false)}
        />
      ) : (
        <div className={styles.sideBarWrapper}>
          <div
            onClick={() => setMenuCollapse(true)}
            className={styles.sideBarHeader}
          >
            <h3>Filters</h3>
            <BsCaretLeftFill className={styles.closeIcon} />
          </div>
          <div className={styles.sideBarSubHeader}>
            <h5>Filter by</h5>
            <button onClick={clearFilter}>Clear</button>
          </div>
          <div className={styles.sideBarMain}>
            <div className={styles.sideBarCategoryCheckBox}>
              <h5>By</h5>

              {cities.map((city) => (
                <div
                  key={city}
                  className={styles.sideBarCategoryChoiceCheckBox}
                >
                  <input
                    type="radio"
                    id={city}
                    name="cities"
                    value={city}
                    checked={filterState.city == city}
                    onChange={handleCityChange}
                  />
                  <label htmlFor={city}>{city}</label>
                </div>
              ))}
            </div>
            <div className={styles.sideBarCategoryRange}>
              <h5>Maks pris</h5>
              <span>{filterState.maxPrice} kr</span>
              <input
                type="range"
                id="price"
                name="price"
                min="10"
                max="30"
                step={0.1}
                value={filterState.maxPrice}
                onChange={handlePriceSliderChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// TODO: fetch cities from backend
const cities = [
  "Oslo",
  "Trondheim",
  "Bergen",
  "Stavanger",
  "Kristiansand",
  "Tromsø",
];
