import React, { useEffect, useState } from "react"
import Sidebar from "../sidebar/Sidebar"
import Header from "../header/Header"
import MainContent from "../mainContent/MainContent"
import styles from "./frontpage.module.css"

export default function Frontpage() {
  const mql = window.matchMedia("(max-width: 1150px)")
  const [viewMatch, setViewMatch] = useState(mql.matches)

  // probably cleaner to use context
  const [priceSliderValue, setPriceSliderValue] = useState(25)
  const [cities, setCities] = useState<string[]>([])

  useEffect(() => {
    function handleResize() {
      setViewMatch(mql.matches)
    }

    window.addEventListener("resize", handleResize)
  })

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          <Sidebar
            collapsed={viewMatch}
            priceSliderValue={priceSliderValue}
            setPriceSliderValue={setPriceSliderValue}
            cities={cities}
            setCities={setCities}
          />
        </div>
        <MainContent cities={cities} priceSliderValue={priceSliderValue} />
      </div>
    </>
  )
}
