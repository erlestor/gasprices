export interface GasPrice {
  id: string;
  price: number;
  createdAt?: string;
}

export interface GasStation {
  id: string;
  name: string;
  city: string;
  latestPrice?: GasPrice;
  prices?: GasPrice[];
}
