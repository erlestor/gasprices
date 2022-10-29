import { useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import circleK from "../../Images/circleK.png";
import styles from "./maincontent.module.css";

import InfiniteScroll from "react-infinite-scroll-component";
import { GET_GAS_STATIONS } from "../../graphql/queries.graphql";
import { GasStation, GetGasStationsData } from "../../graphql/types";
import { hasMoreVar, limit } from "../../state/endlessScrollState";
import { filterStateVar } from "../../state/filterState";
import { SearchInputEl } from "./searchInputEl";

export default function MainContent() {
  const filterState = useReactiveVar(filterStateVar);
  const hasMore = useReactiveVar(hasMoreVar);
  console.log(filterState);

  const { error, loading, data, fetchMore, refetch } =
    useQuery<GetGasStationsData>(GET_GAS_STATIONS, {
      variables: {
        city: filterState.cities[0],
        maxPrice: filterState.maxPrice,
        nameSearch: filterState.nameSearch,
        limit,
        sortBy: "latestPrice",
      },
    });

  useEffect(() => {
    refetch();
    hasMoreVar(true);
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
    <main className={styles.main}>
      <SearchInputEl />
      {data && (
        <InfiniteScroll
          className={styles.mainContent}
          next={loadMoreData}
          hasMore={hasMore}
          children={data.gasStations.map((gasStation) =>
            gasStationEl(gasStation)
          )}
          loader={<h4>Loading...</h4>}
          dataLength={data.gasStations.length}
          endMessage={<h4>Ingen flere bensinstasjoner ⛽</h4>}
        />
      )}
    </main>
  );
}

function formatPrice(number: number | undefined): string {
  if (!number) {
    return "Ingen pris";
  }
  return number.toFixed(2) + "kr";
}

function gasStationEl(gasStation: GasStation) {
  return (
    <div key={gasStation.id} className={styles.cardStyle}>
      <div className={styles.imageDiv}>
        <img
          className={styles.cardStyleImage}
          src={circleK}
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
