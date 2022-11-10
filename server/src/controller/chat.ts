import { RowDataPacket } from 'mysql2';
import { Request, Response, NextFunction } from 'express';

import { getSocketIO } from '../connection/socket';
import { sqlInsertHandler, sqlSelectHandler } from '../utils/sqlHandler';

interface IChats extends RowDataPacket {
  id: number;
  chatRoom: number;
  user: number;
  message: string;
  createAt: Date;
}

interface ISellInfo extends RowDataPacket {
  _id: number;
}

export const getSellInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id } = req.params;
  const rows: ISellInfo[] = await sqlSelectHandler(
    'SELECT p.id, p.photocard, p.title, p.price, p2.path FROM photocardsellarticle p INNER JOIN photocard p2  ON p.photocard = p2.id WHERE p2.id = (SELECT id from photocard p2 where p2.id = (SELECT photocard from photocardsellarticle p3 where id = ?))',
    [_id]
  );
  res.status(200).json(rows);

};

export const getChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { chatRoom } = req.params;

  const rows: IChats[] = await sqlSelectHandler(
    'SELECT * FROM Chat WHERE chatRoom=?',
    [chatRoom]
  );

  res.status(200).json(rows);
};
export const createChat = async (data: any) => {
  const { chatRoom, user, message } = data;

  const inserResult = await sqlInsertHandler(
    'INSERT INTO Chat (chatRoom, user, message) VALUES(?,?,?)',
    [chatRoom, user, message]
  );

  const row: IChats[] = await sqlSelectHandler(
    'SELECT * FROM Chat WHERE id=?',
    [inserResult.insertId]
  );

  // res.status(200).json(row[0]);

  console.log('object :>> ', row[0]);
  getSocketIO().to(row[0].chatRoom.toString()).emit('new-message', row[0]);
  getSocketIO()
    .to(row[0].chatRoom.toString())
    .emit('alert-new-message', row[0]);
};
