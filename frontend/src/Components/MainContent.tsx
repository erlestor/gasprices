import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import circleK from "../Images/circleK.png";
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
      <div className={styles.mainContent}>
        {data && data.gasStations.map((gasStation) => gasStationEl(gasStation))}
      </div>
      <button onClick={loadMoreData}>Last mer</button>
    </div>
  );
}

function gasStationEl(gasStation: GasStation) {
  return (
    <div className={styles.cardStyle}>
      <div className={styles.imageDiv}>
        <img
          className={styles.cardStyleImage}
          src={circleK}
          alt="CirkleK logo"
        />
      </div>
      <div className={styles.cardInformation}>
        <div className={styles.cardAreaDiv}>
          <span className={styles.cardBrand}>Cirkle K</span>
          <span className={styles.cardArea}>Nidarvoll</span>
        </div>
        <div className={styles.cardPriceDiv}>
          <span className={styles.cardPrice}>18.87 kr</span>
        </div>
      </div>
    </div>
  );
}
