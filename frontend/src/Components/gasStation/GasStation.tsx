import { FC } from "react"
import styles from "./gasStation.module.css"
import { GasStation } from "../../types"
import { FaGasPump } from "react-icons/fa"

interface Props {
  station: GasStation
}

const GasStationC: FC<Props> = ({ station }) => {
  return (
    <div className={styles.stationCard}>
      <h2 className={styles.stationCardHeader}>
        {station.name}, {station.city}
      </h2>
      <div className={styles.fuelContainer}>
        <FaGasPump className={styles.pumpIcon} />
        <h3>
          {station.latestPrice
            ? station.latestPrice.toFixed(2) + " kr/l"
            : "Ingen nylige priser"}
        </h3>
      </div>
    </div>
  )
}

export default GasStationC
