import { RowDataPacket } from "mysql2"
import { Request, Response, NextFunction } from 'express';
import { db } from '../db/database';

interface Test extends RowDataPacket {
  id: number;
  name: string;
}

export const searchChatRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const test = await db
    .execute<Test[]>('SELECT * FROM Test')
    .then((result) => result[0]);

  console.log(test);
  res.status(200).json(test);
};
