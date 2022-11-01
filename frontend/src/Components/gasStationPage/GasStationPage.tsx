import { useQuery } from "@apollo/client";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { GET_GAS_STATION } from "../../graphql/queries.graphql";
import { GetGasStationData } from "../../types";
import AddPrice from "../addItem/AddPrice";
import Header from "../header/Header";
import styles from "./gasStationPage.module.css";
import PricesGraph from "./PricesGraph";

export function GasStationPage() {
  const { id } = useParams();

  const { error, loading, data, refetch } = useQuery<GetGasStationData>(
    GET_GAS_STATION,
    {
      variables: {
        id,
      },
    }
  );

  if (error) return <h1>error.message</h1>;

  if (loading) return <h1> {loading && <AiOutlineLoading3Quarters />}</h1>;

  return (
    <div>
      <Header />
      <div className={styles.stationPageContainer}>
        <Link to={"/"} className={styles.backButtonLink}>
          <button className={styles.backButton}>
            <h3>Tilbake</h3>
          </button>
        </Link>

        <h1 className={styles.gasStationName}>{data?.gasStation.name}</h1>
        <h2 className={styles.gasStationCityHeader}>{data?.gasStation.city}</h2>
        <h2 className={styles.registeredPricesHeader}>
          Siste registrerte priser
        </h2>

        {data && data?.gasStation && (
          <>
            {data.gasStation.prices && data.gasStation.prices.length > 0 && (
              <>
                <PricesGraph data={data} />
                <h3>
                  Siste registrerte pris:{" "}
                  <span id="lastPriceText">
                    {data.gasStation.prices[
                      data.gasStation.prices?.length - 1
                    ].price.toFixed(2)}
                  </span>{" "}
                  kr
                </h3>
              </>
            )}
            <AddPrice id={data?.gasStation.id} refetch={refetch} />
          </>
        )}
      </div>
    </div>
  );
}
