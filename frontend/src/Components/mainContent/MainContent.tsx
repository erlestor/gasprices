import { useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import circleK from "../../Images/circleK.png";
import esso from "../../Images/esso.png";
import shell from "../../Images/shell.jpg";
import unoX from "../../Images/uno-x.png";
import styles from "./maincontent.module.css";
import Filter from "./filterEl";

import { GET_GAS_STATIONS } from "../../graphql/queries.graphql";
import { GasStation, GetGasStationsData } from "../../graphql/types";
import { filterStateVar } from "../../state/filterState";
import { NOTFOUND } from "dns";

export default function MainContent() {
  const filterState = useReactiveVar(filterStateVar);
  console.log(filterState);

  const { error, loading, data, fetchMore, refetch } =
    useQuery<GetGasStationsData>(GET_GAS_STATIONS, {
      variables: {
        city: filterState.city,
        maxPrice: filterState.maxPrice,
        nameSearch: filterState.nameSearch,
        limit: 12,
        sortBy: filterState.sortBy,
        sortDirection: filterState.sortDirection,
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
      <div className={styles.filterDiv}>
        <div className={styles.searchDiv}>
          <input type="text" placeholder="Search..."></input>
          <BsSearch className={styles.searchIcon} />
        </div>
        <Filter />
      </div>
      <div className={styles.mainContent}>
        {data && data.gasStations.map((gasStation) => gasStationEl(gasStation))}
      </div>
      <button onClick={loadMoreData}>Last mer</button>
    </div>
  );
}

function formatPrice(number: number | undefined): string {
  if (!number) {
    return "Ingen pris";
  }
  return number.toFixed(2);
}

function gasStationEl(gasStation: GasStation) {
  return (
    <div className={styles.cardStyle}>
      <div className={styles.imageDiv}>
        <img
          className={styles.cardStyleImage}
          src={findImage(gasStation.name)}
          alt="CirkleK logo"
        />
      </div>
      <div className={styles.cardInformation}>
        <div className={styles.cardAreaDiv}>
          <span className={styles.cardBrand}>{gasStation.name}</span>
          <span className={styles.cardArea}>{gasStation.city}</span>
        </div>
        <div className={styles.cardPriceDiv}>
          <span className={styles.cardPrice}>
            {formatPrice(gasStation.latestPrice)}
          </span>
        </div>
      </div>
    </div>
  );
}

function findImage(brandName: string): string | undefined {
  if (brandName == "Esso") {
    return esso;
  } else if (brandName == "Shell") {
    return shell;
  } else if (brandName == "Circle K") {
    return circleK;
  } else if (brandName == "Uno-X") {
    return unoX;
  }
  return shell;
}
