export interface GasPrice {
  id: string;
  price: number;
  createdAt: string;
}

export interface GasStation {
  id: string;
  name: string;
  city: string;
  latestPrice?: number;
  prices?: GasPrice[];
}

export interface GetGasStationsData {
  gasStations: GasStation[];
}

export interface GetGasStationData {
  gasStation: GasStation;
}

export interface Datapoint {
  name: string;
  [key: string]: any;
}