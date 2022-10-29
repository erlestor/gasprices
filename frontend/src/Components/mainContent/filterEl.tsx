import { useReactiveVar } from '@apollo/client';
import React from 'react';
import { filterStateVar } from '../../state/filterState';
import styles from "./filterEl.module.css";

export enum sortByOptions {
  priceASC = "latestPrice|ASC",
  priceDESC = "latestPrice|DESC",
  nameASC = "name|ASC",
  nameDESC = "name|DESC"
}

export default function FilterEl() {

  const filterState = useReactiveVar(filterStateVar);
  const selectedFilterOption = filterState.sortBy + "|" + filterState.sortDirection as sortByOptions;
  console.log(selectedFilterOption)

  const handleSortChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value;
    const [sortBy, direction] = value.split("|")
    filterStateVar({
      ...filterStateVar(),
      sortBy: sortBy as "latestPrice" | "name",
      sortDirection: direction as "ASC" | "DESC"
    })
  }

  return (
    <select value={selectedFilterOption} onChange={handleSortChange} className={styles.filters} name="filters" id="filters">
        <option value={sortByOptions.priceASC}>Pris - lav til høy</option>
        <option value={sortByOptions.priceDESC}>Pris - høy til lav</option>
        <option value={sortByOptions.nameASC}>Navn - a til å</option>
        <option value={sortByOptions.nameDESC}>Navn - å til a</option>
    </select>
  );
}
