import { gql } from "@apollo/client";

export const GET_GAS_STATIONS = gql`
query getGasStations {
    gasStations {
      id
      name
      city
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
