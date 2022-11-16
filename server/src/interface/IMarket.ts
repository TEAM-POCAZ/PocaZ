import { RowDataPacket } from "mysql2";

export interface IMarket  extends RowDataPacket{
  photocard: number;
  user: number;
  title: string;
  description: string;
  price: number;
}

export interface IMarket2 extends IMarket {
  tradeStatus: number;
}
