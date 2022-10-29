import { gql } from "@apollo/client";

export const GET_GAS_STATIONS = gql`
  query getGasStations(
    $maxPrice: Float
    $minPrice: Float
    $city: String
    $limit: Int
    $skip: Int
    $sortBy: String
    $sortDirection: String
    $nameSearch: String
  ) {
    gasStations(
      maxPrice: $maxPrice
      minPrice: $minPrice
      city: $city
      limit: $limit
      skip: $skip
      sortBy: $sortBy
      sortDirection: $sortDirection
      nameSearch: $nameSearch
    ) {
      id
      name
      city
      latestPrice
      prices {
        id
        price
      }
    }
  }
`;

export const getGasStation = gql`
  query gasStation($id: ID!) {
    gasStation(id: $id) {
      id
      name
      city
      latestPrice
      prices
    }
  }
`;
