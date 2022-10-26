import { makeVar } from "@apollo/client";

export interface FilterOptions {
  cities: string[];
  maxPrice?: number;
  nameSearch: string;
}

function getDefaultFilterState(): FilterOptions {
  return {
    cities: [],
    maxPrice: undefined,
    nameSearch: "",
  };
}

export function resetFilterState() {
    filterStateVar(getDefaultFilterState());
}

export const filterStateVar = makeVar<FilterOptions>(getDefaultFilterState());
