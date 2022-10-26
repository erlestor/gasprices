import { useEffect, useState } from "react";
import styles from "./maincontent.module.css";
import { BsSearch } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useQuery, useReactiveVar } from "@apollo/client";
import GasStationC from "../gasStation/GasStation";
import { GET_GAS_STATIONS } from "../../graphql/queries.graphql";
import { GasStation, GetGasStationsData } from "../../graphql/types";
import { debounce } from "./debounce";
import { filterStateVar } from "../../state/filterState";
import { SearchInputEl } from "./searchInputEl";

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
      <SearchInputEl />
      <div className={styles.stationsContainer}>
        {loading ? (
          <AiOutlineLoading3Quarters className={styles.loadingIcon} />
        ) : (
          data &&
          data.gasStations.map((station: GasStation, stationIdx: number) => (
            <GasStationC key={stationIdx} station={station} />
          ))
        )}
      </div>
      <button onClick={loadMoreData}>Last mer</button>
    </div>
  );
}
