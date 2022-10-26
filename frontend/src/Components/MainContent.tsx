import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { GET_GAS_STATIONS } from "../graphql/queries.graphql";
import { GasStation, GetGasStationsData } from "../graphql/types";
import styles from "./maincontent.module.css";

export default function MainContent() {
  const { error, loading, data, fetchMore } = useQuery<GetGasStationsData>(
    GET_GAS_STATIONS,
    {
      variables: {
        sortBy: "latestPrice",
        limit: 10,
      },
    }
  );

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  function loadMoreData() {
    fetchMore({
      variables: {
        skip: data?.gasStations.length,
      },
    });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.main}>
      <div className={styles.searchDiv}>
        <input type="text" placeholder="Search..."></input>
        <BsSearch className={styles.searchIcon} />
      </div>
      {data &&
        data.gasStations.map((gasStation) => {
          return (
            <div key={gasStation.id} className={styles.gasStationEl}>
              <h3>{gasStation.name}</h3>
              <p>{gasStation.city}</p>
              <p>{gasStation.latestPrice ?? "-"} kr</p>
            </div>
          );
        })}
      <button onClick={loadMoreData}>Last mer</button>
    </div>
  );
}
