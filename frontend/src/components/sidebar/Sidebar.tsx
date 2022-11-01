import { useReactiveVar } from "@apollo/client";
import React, { useMemo, useState } from "react";
import { BsCaretLeftFill, BsFilterLeft } from "react-icons/bs";
import { filterStateVar, resetFilterState } from "../../state/filterState";
import { debounce } from "../../service/debounce";
import styles from "./sidebar.module.css";

export default function SideBar({ collapsed }: { collapsed: boolean }) {
  
  // Saves the state of the sidebar (collapsed or not)
  const [menuCollapse, setMenuCollapse] = useState(collapsed);

  // Reactive variable which tracks filter state
  const filterState = useReactiveVar(filterStateVar);

  // used to display slider's current value
  const [maxPriceSliderValue, setMaxPriceSliderValue] = useState<number>(
    filterState.maxPrice
  );

  /**
   * Update the reactive variable which tracks filter state with the new max price
   * Function has a delay of 100ms, so that it does not spam the server with requests
   */
  const updateDebouncePrice = debounce((price: number) => {
    filterStateVar({
      ...filterStateVar(),
      maxPrice: price,
    });
  }, 100);

  /**
   *
   * @param event The event of changing the value of the slider
   * Passes the value given from the event as a float to update debounce price
   */
  const handlePriceSliderChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(event.target.value);
    setMaxPriceSliderValue(value);
    updateDebouncePrice(value);
  };

  /**
   *
   * @param e The event of clicking a radio button
   * Retrieves if the radiobutton is checked or not and the city related to the radiobutton
   * If the radiobutton is checked, update the reactive variable that tracks filter state
   * @returns
   */
  const handleCityChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const checked = e.target.checked;
    const city = e.target.value;

    if (checked) {
      filterStateVar({
        ...filterStateVar(),
        city,
      });
    }
  };

  /**
   * Resets the state of the sidebar filter
   */
  const clearFilter = () => {
    resetFilterState();
  };

  return (
    <div
      className={styles.sideBar}
      /**
       * Change css based on if the sidebar is closed or not
       */
      style={{
        width: menuCollapse ? "fit-content" : "280px",
        minWidth: menuCollapse ? "0px" : "280px",
      }}
    >
      {menuCollapse ? (
        // To display if the sidebar is closed
        <BsFilterLeft
          id="filterIcon"
          className={styles.filterIcon}
          // Change state of sidebar when it is clicked
          onClick={() => setMenuCollapse(false)}
        />
      ) : (
        // To display if the sidebar is not closed
        <div id="sideBar" className={styles.sideBarWrapper}>
          <div
            // Change state of sidebar when it is clicked
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
                    checked={filterState.city === city}
                    onChange={handleCityChange}
                  />
                  <label htmlFor={city}>{city}</label>
                </div>
              ))}
            </div>
            <div className={styles.sideBarCategoryRange}>
              <h5>Maks pris</h5>
              <span>{maxPriceSliderValue} kr</span>
              <input
                type="range"
                id="price"
                name="price"
                min="10"
                max="30"
                step={0.1}
                onChange={handlePriceSliderChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// The cities available for filtering
const cities = [
  "Oslo",
  "Trondheim",
  "Bergen",
  "Stavanger",
  "Kristiansand",
  "Tromsø",
];
