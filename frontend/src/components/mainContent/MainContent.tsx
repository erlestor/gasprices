import { useQuery, useReactiveVar } from "@apollo/client";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import circleK from "../../Images/circleK.png";
import esso from "../../Images/esso.png";
import shell from "../../Images/shell.jpg";
import unoX from "../../Images/uno-x.png";
import noimage from "../../Images/noimage.jpg";
import styles from "./maincontent.module.css";

import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { GET_GAS_STATIONS } from "../../graphql/queries.graphql";
import {
  hasMoreVar as endlessScrollHasMoreElementsVar,
  limit,
} from "../../state/endlessScrollState";
import { filterStateVar } from "../../state/filterState";
import { GasStation, GetGasStationsData } from "../../types";
import { useEffect } from "react";
import { SearchInputEl } from "./components/SearchInputEl";
import FilterEl from "./components/FilterEl";

export default function MainContent() {
  // Reactive variable used to track filter state
  const filterState = useReactiveVar(filterStateVar);

  // Reactive variable which tracks if there are more elements to load
  const endlessScrollHasMoreElements = useReactiveVar(
    endlessScrollHasMoreElementsVar
  );

  /**
   * Fetches data from graphql server
   */
  const { error, loading, data, fetchMore, refetch } =
    useQuery<GetGasStationsData>(GET_GAS_STATIONS, {
      variables: {
        city: filterState.city,
        maxPrice: filterState.maxPrice,
        nameSearch: filterState.nameSearch,
        sortBy: filterState.sortBy,
        sortDirection: filterState.sortDirection,
        limit,
      },
    }
  )

  useEffect(() => {
    endlessScrollHasMoreElementsVar(true);
  }, [filterState]);

  function loadMoreData() {
    fetchMore({
      variables: {
        skip: data?.gasStations.length,
      },
    })
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <main className={styles.main}>
      <div className={styles.filterDiv}>
        <SearchInputEl />
        <FilterEl />
      </div>
      {data && !loading ? (
        <InfiniteScroll
          className={styles.mainContent}
          next={loadMoreData}
          hasMore={endlessScrollHasMoreElements}
          children={data.gasStations.map((gasStation) =>
            gasStationEl(gasStation)
          )}
          loader={<h4>Loading...</h4>}
          dataLength={data.gasStations.length}
        />
      ) : (
        <AiOutlineLoading3Quarters size={20} />
      )}
      {data && data.gasStations.length === 0 && !loading && (
        <h4 className="center margin">Ingen bensinstasjoner i valgt søk</h4>
      )}
      {!endlessScrollHasMoreElements && data && data.gasStations.length > 0 && (
        <h4 className="center margin">Ingen flere bensinstasjoner ⛽</h4>
      )}
    </main>
  )
}

/**
 *
 * @param number The price to be formatted
 * @returns If not a number, return a string which clarifies that no price was found, else return the formatted price
 */

function formatPrice(number: number | undefined): string {
  if (!number) {
    return "Ingen pris"
  }
  return number.toFixed(2) + "kr"
}

/**
 *
 * @param gasStation The gasStation to be displayed
 * @returns Returns the html-code for the given gasStation
 */
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
            <span className={styles.cardBrand} data-testid="gasStationName">
              {gasStation.name}
            </span>
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
  )
}

/**
 *
 * @param brandName The name of the gasStation
 * @returns Returns the image related to the name of the gasStation
 */
function findImage(brandName: string): string | undefined {
  if (brandName === "Esso") {
    return esso
  } else if (brandName === "Shell") {
    return shell
  } else if (brandName === "Circle K") {
    return circleK
  } else if (brandName === "Uno-X") {
    return unoX
  }
  return noimage;
}
