import { useQuery, useReactiveVar } from "@apollo/client";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import circleK from "../../Images/circleK.png";
import esso from "../../Images/esso.png";
import shell from "../../Images/shell.jpg";
import unoX from "../../Images/uno-x.png";
import Filter from "./filterEl";
import styles from "./maincontent.module.css";

import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { GET_GAS_STATIONS } from "../../graphql/queries.graphql";
import { hasMoreVar, limit } from "../../state/endlessScrollState";
import { filterStateVar } from "../../state/filterState";
import { GasStation, GetGasStationsData } from "../../types";
import { SearchInputEl } from "./searchInputEl";
import { useEffect } from "react";

export default function MainContent() {
  const filterState = useReactiveVar(filterStateVar);
  const hasMore = useReactiveVar(hasMoreVar);

  const { error, loading, data, fetchMore } = useQuery<GetGasStationsData>(
    GET_GAS_STATIONS,
    {
      variables: {
        city: filterState.city,
        maxPrice: filterState.maxPrice,
        nameSearch: filterState.nameSearch,
        sortBy: filterState.sortBy,
        sortDirection: filterState.sortDirection,
        limit,
      },
    }
  );

  useEffect(() => {
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

  if (loading) {
    return <div id="#mainContentLoading">Loading...</div>;
  }

  return (
    <main className={styles.main}>
      <div className={styles.filterDiv}>
        <SearchInputEl />
        <Filter />
      </div>
      {data ? (
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
      ) : (
        <AiOutlineLoading3Quarters size={20} />
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
    <Link
      id="gasStationLink"
      key={gasStation.id}
      to={`/station/${gasStation.id}`}
      className={styles.cardLink}
      data-testid="gasStationEl"
    >
      <div className={styles.cardStyle}>
        <div className={styles.imageDiv}>
          <img
            className={styles.cardStyleImage}
            src={findImage(gasStation.name)}
            alt={gasStation.name + " logo"}
          />
        </div>
        <div className={styles.cardInformation}>
          <div className={styles.cardAreaDiv}>
            <span className={styles.cardBrand}>{gasStation.name}</span>
            <span className={styles.cardArea}>{gasStation.city}</span>
          </div>
          <div className={styles.cardPriceDiv}>
            <span data-cy="cardPrice" className={styles.cardPrice}>
              {formatPrice(gasStation.latestPrice)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function findImage(brandName: string): string | undefined {
  if (brandName === "Esso") {
    return esso;
  } else if (brandName === "Shell") {
    return shell;
  } else if (brandName === "Circle K") {
    return circleK;
  } else if (brandName === "Uno-X") {
    return unoX;
  }
  return shell;
}
