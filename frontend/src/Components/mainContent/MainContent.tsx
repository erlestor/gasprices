import { useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import circleK from "../Images/circleK.png";
import styles from "./maincontent.module.css";

import { GET_GAS_STATIONS } from "../../graphql/queries.graphql";
import { GasStation, GetGasStationsData } from "../../graphql/types";
import { filterStateVar } from "../../state/filterState";

export default function MainContent() {
  const filterState = useReactiveVar(filterStateVar);
  console.log(filterState);

  const { error, loading, data, fetchMore, refetch } =
    useQuery<GetGasStationsData>(GET_GAS_STATIONS, {
      variables: {
        city: filterState.cities[0],
        maxPrice: filterState.maxPrice,
        nameSearch: filterState.nameSearch,
        limit: 12,
        sortBy: "latestPrice",
      },
    });

  useEffect(() => {
    refetch();
  }, [filterState]);

  function loadMoreData() {
    fetchMore({
      variables: {
        skip: data?.gasStations.length,
      },
    });
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
