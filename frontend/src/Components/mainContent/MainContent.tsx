import { useState } from "react"
import styles from "./maincontent.module.css"
import { BsSearch } from "react-icons/bs"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { useQuery } from "@apollo/client"
import { GET_GAS_STATIONS } from "../../graphql/queries"
import { GasStation } from "../../types"
import GasStationC from "../gasStation/GasStation"

type Props = {
  cities: string[]
  priceSliderValue: number
}

export default function MainContent({ cities, priceSliderValue }: Props) {
  const [searchText, setSearchText] = useState("")
  const [debounceText, setDebounceText] = useState("")

  const { error, loading, data } = useQuery(GET_GAS_STATIONS, {
    variables: {
      city: cities[0],
      maxPrice: priceSliderValue,
      nameSearch: debounceText,
      limit: 100,
      sortBy: "name",
    },
  })

  const debounce = (cb: any, delay = 1000) => {
    let timeout: NodeJS.Timeout

    return (...args: any) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        cb(...args)
      }, delay)
    }
  }

  const updateDebounceText = debounce((text: string) => {
    setDebounceText(text)
  }, 500)

  const handleSearchChange = (e: any) => {
    setSearchText(e.target.value)
    updateDebounceText(e.target.value)
  }

  return (
    <div className={styles.main}>
      <div className={styles.searchDiv}>
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearchChange}
        ></input>
        <div>
          <BsSearch className={styles.searchIcon} />
        </div>
      </div>

      <div className={styles.stationsContainer}>
        {loading ? (
          <AiOutlineLoading3Quarters className={styles.loadingIcon} />
        ) : (
          data &&
          data.gasStations.map((station: GasStation, stationIdx: number) => (
            <GasStationC key={stationIdx} station={station} />
          ))
        )}
      </div>
    </div>
  )
}
