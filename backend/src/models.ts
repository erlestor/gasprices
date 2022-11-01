export interface GasStation {
    name: string;
    city: string;
    latestPrice: number;
}

export interface GasPrice {
    gasStation: string;
    price: number;
}