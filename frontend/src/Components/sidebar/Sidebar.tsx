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
      maxPrice: parseInt(event.target.value),
    });
  };

  const handleCityChange = (e: any) => {
    const checked = e.target.checked;
    const city = e.target.name;

    if (checked) {
      filterStateVar({
        ...filterStateVar(),
        cities: [...filterStateVar().cities, city],
      });
      return;
    }

    filterStateVar({
      ...filterStateVar(),
      cities: filterStateVar().cities.filter((c) => c !== city),
    });
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
                    type="checkbox"
                    name={city}
                    checked={filterState.cities.includes(city)}
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
                min="0"
                max="100"
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
