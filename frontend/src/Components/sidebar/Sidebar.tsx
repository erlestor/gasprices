import React, { useEffect, useState } from "react"
import styles from "./sidebar.module.css"
import { BsFilterLeft } from "react-icons/bs"
import { BsCaretLeftFill } from "react-icons/bs"

type SidebarProps = {
  collapsed: boolean
  priceSliderValue: number
  setPriceSliderValue: (val: number) => void
  cities: string[]
  setCities: (cities: string[]) => void
}

export default function SideBar({
  collapsed,
  priceSliderValue,
  setPriceSliderValue,
  cities,
  setCities,
}: SidebarProps) {
  const [menuCollapse, setMenuCollapse] = useState(collapsed)

  useEffect(() => {
    console.log(cities)
  }, [cities])

  const handlePriceSliderChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPriceSliderValue(event.target.valueAsNumber)
  }

  function closeMenu() {
    setMenuCollapse(true)
  }

  function showMenu() {
    setMenuCollapse(false)
  }

  const handleCityChange = (e: any) => {
    const checked = e.target.checked
    const city = e.target.name

    if (checked) {
      setCities([...cities, city])
      return
    }

    const newCities = cities.filter((c) => c !== city)
    setCities(newCities)
  }

  const clearFilter = () => {
    setCities([])
    setPriceSliderValue(25)
  }

  return (
    <div
      className={styles.sideBar}
      style={{
        width: menuCollapse ? "fit-content" : "280px",
        minWidth: menuCollapse ? "0px" : "280px",
      }}
    >
      {menuCollapse ? (
        <BsFilterLeft className={styles.filterIcon} onClick={showMenu} />
      ) : (
        <div className={styles.sideBarWrapper}>
          <div onClick={closeMenu} className={styles.sideBarHeader}>
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
              <div className={styles.sideBarCategoryChoiceCheckBox}>
                <input
                  type="checkbox"
                  id="Oslo"
                  name="Oslo"
                  onChange={handleCityChange}
                />
                <label htmlFor="Oslo">Oslo</label>
                <span>1502</span>
              </div>
              <div className={styles.sideBarCategoryChoiceCheckBox}>
                <input
                  type="checkbox"
                  id="Trondheim"
                  name="Trondheim"
                  onChange={handleCityChange}
                />
                <label htmlFor="Trondheim">Trondheim</label>
                <span>301</span>
              </div>
              <div className={styles.sideBarCategoryChoiceCheckBox}>
                <input
                  type="checkbox"
                  id="test"
                  name="test"
                  onChange={handleCityChange}
                />
                <label htmlFor="test">Test</label>
                <span>152</span>
              </div>
            </div>
            <div className={styles.sideBarCategoryRange}>
              <h5>Maks pris</h5>
              <span>{priceSliderValue} kr</span>
              <input
                type="range"
                id="price"
                name="price"
                min="0"
                max="100"
                value={priceSliderValue}
                onChange={handlePriceSliderChange}
              />
            </div>
            {/* <div className={styles.sideBarCategoryCheckBox}>
              <h5>Kjøp eller leie</h5>
              <div className={styles.sideBarCategoryChoiceCheckBox}>
                <input type="checkbox" id="kjope" name="kjope" />
                <label htmlFor="kjope">Kjøpe</label>
                <span>52</span>
              </div>
              <div className={styles.sideBarCategoryChoiceCheckBox}>
                <input type="checkbox" id="leie" name="leie" />
                <label htmlFor="leie">Leie</label>
                <span>15</span>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </div>
  )
}
