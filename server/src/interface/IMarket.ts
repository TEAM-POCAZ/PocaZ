export interface IMarket {
  photocard: number;
  user: number;
  title: string;
  description: string;
  price: number;
}

export interface IMarket2 extends IMarket {
  tradeStatus: number;
}
