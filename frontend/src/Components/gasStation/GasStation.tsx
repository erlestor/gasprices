import { FC } from "react"
import { GasStation } from "../../types"
import styles from "./gasStation.module.css"

interface Props {
  station: GasStation
}

const GasStationC: FC<Props> = ({ station }) => {
  return (
    <div className={styles.stationCard}>
      <h2>
        {station.name} - {station.city}
      </h2>
      <h3>
        {station.latestPrice
          ? station.latestPrice.toFixed(2) + " kr/l"
          : "Ingen nylige priser"}
      </h3>
    </div>
  )
}

export default GasStationC
