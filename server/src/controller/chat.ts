import express from 'express';
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

interface ISellItem extends RowDataPacket {
  marketItemId: number;
}
interface ICheckChatRoom extends RowDataPacket {
  sellerId: number;
  loginUserId: number;
  marketItemId: number;
}

export const getCheckChatRoom = async (
  chatInfo: ICheckChatRoom
) => {
  const { marketItemId, loginUserId, sellerId } = chatInfo;
  console.log('🚀 ~ file: chat.ts ~ line 32 ~ loginUserId', loginUserId);
  console.log('🚀 ~ file: chat.ts ~ line 32 ~ marketItemId', marketItemId);
  const rows: ICheckChatRoom[] = await sqlSelectHandler(
    `SELECT id
    from ChatRoom c
    INNER JOIN ChatUser cu on
    c.id = cu.chatRoom
    WHERE sellarticleid = ?
    AND cu.user = ?`,
    [marketItemId, loginUserId]
  );
  if(rows.length!==0){
    return rows[0].id;
  } else{

  const insertChatRoom : any = await sqlInsertHandler(
    `INSERT INTO ChatRoom (sellarticleid) VALUES (?)`, [marketItemId] 
  );
  const room = insertChatRoom.insertId;
  const insertChatUser = await sqlInsertHandler(
    `INSERT INTO ChatUser (chatRoom, user,sellItemId)
    VALUES (?, ?,?), (?, ?,?)`, [room, sellerId, marketItemId, room, loginUserId, marketItemId]
  );
  return room;
  } ;
};

export const getSellItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { marketItemId } = req.params;

  const rows: ISellItem[] = await sqlSelectHandler(
    `SELECT p.id, p.title, p.price, p2.path 
    From PhotocardSellArticle p
    INNER JOIN PhotoCard p2  ON p.photocard = p2.id
    WHERE p.id = ?`,
    [marketItemId]
  );
  res.status(200).json(rows[0]);
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
