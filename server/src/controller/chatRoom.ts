import { RowDataPacket } from 'mysql2';
import { Request, Response, NextFunction } from 'express';

import { sqlHandler } from '../utils/sqlHandler';

interface Test extends RowDataPacket {
  id: number;
  name: string;
}

export const searchChatRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const rows: Test[] = await sqlHandler('SELECT * FROM Test');
  console.log(rows[0]);
  res.status(200).json(rows);
};

export const test = async (req: Request, res: Response, next: NextFunction) => {
  // const [rows] = await db.execute<Test[]>('SELECT * FROM Test');
  // console.log(rows);
  // res.status(200).json(rows);
};
