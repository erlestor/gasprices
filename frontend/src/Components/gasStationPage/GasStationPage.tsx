import { useMutation, useQuery } from "@apollo/client"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { useParams } from "react-router-dom"
import { GET_GAS_STATION } from "../../graphql/queries.graphql"
import { GetGasStationData } from "../../graphql/types"
import AddItem from "../addItem/AddItem"
import Header from "../header/Header"
import styles from "./gasStationPage.module.css"

export function GasStationPage() {
  const { id } = useParams();

  const { error, loading, data } = useQuery<GetGasStationData>(
    GET_GAS_STATION,
    {
      variables: {
        id: id,
      },
    }
  );

  return (
    <div>
      <Header />
      <div className={styles.stationPageContainer}>
        <h1>{error && error.message}</h1>
        <h1> {loading && <AiOutlineLoading3Quarters />}</h1>
      </div>
      <AddItem stationName={data?.gasStation.name} id={data?.gasStation.id} />
    </div>
  );
}
