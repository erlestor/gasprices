import { useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import { GET_GAS_STATION } from "../../graphql/queries.graphql"
import { GetGasStationData } from "../../graphql/types"
import Header from "../header/Header"
import styles from "./gasStationPage.module.css"

export function GasStationPage() {
  const { id } = useParams()

  const { error, loading, data } = useQuery<GetGasStationData>(GET_GAS_STATION, {
    variables: {
      id: id,
    },
  })

  return (
    <div>
      <Header />
      <div className={styles.stationPageContainer}>
        <h1>{error && error.message}</h1>
      </div>
    </div>
  )
}
