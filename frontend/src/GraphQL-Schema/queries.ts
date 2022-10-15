import {gql} from '@apollo/client';

export const getGasStations = gql`
    query { 
        gasStations {
            id
            name
            city
            latestPrice
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
        }
    }
`;

