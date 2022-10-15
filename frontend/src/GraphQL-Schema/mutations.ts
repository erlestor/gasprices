import {gql} from '@apollo/client';

export const ADD_GAS_STATION = gql`
    mutation add_gas_station(
        $name: String!
        $city: String!
        $latestPrice: GasPrice
        $prices: [GasPrice]
        ) {

        addGasStation(
            name: $name
            city: $city
            latestPrice: $latestPrice
            prices: $prices
            ) {
            id
            name
            city
            latestPrice
            prices
        }
    }
`;

export const ADD_GAS_PRICE = gql`
    mutation add_gas_price(
        $id: ID!
        $price: Float!
        $createdAt: Int!
        ) {
            
            addGasPrice(
                id: $id
                price: $price
                createdAt: $createdAt
                ) {
                id
                price
                createdAt
            }
        }
    `;
    
export const UPDATE_GAS_STATION = gql`
    mutation update_gas_station(
        $id: ID!
        $name: String!
        $city: String!
        $latestPrice: GasPrice
        $prices: [GasPrice]
        ) {

        updateGasStation(
            id: $id
            name: $name
            city: $city
            latestPrice: $latestPrice
            prices: $prices
            ) {
            id
            name
            city
            latestPrice
            prices
        }
    }
`;

export const DELETE_GAS_STATION = gql`
    mutation delete_gas_station($id: ID!) {
        deleteGasStation(id: $id) {
            id
            name
            city
            latestPrice
            prices
        }
    }
`;


