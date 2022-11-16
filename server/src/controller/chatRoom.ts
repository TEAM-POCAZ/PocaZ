import { RowDataPacket } from 'mysql2';
import { Request, Response, NextFunction } from 'express';

import { sqlSelectHandler } from '../utils/sqlHandler';

interface IChatRoom extends RowDataPacket {
  chatRoom: number;
  name: string;
}

export const getChatRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req.params;

  const rows: IChatRoom[] = await sqlSelectHandler(
    `SELECT cr.chatRoom, -- 채팅방
            u.id, -- 상대방 id
            u.email, -- 상대방 이메일
            u.nickname, -- 상대방 닉네임
            u.profileImage, -- 상대방 프로필 이미지
            cr3.message, -- 채팅방의 가장 최근 메세지
            cr3.createAt, -- 최근 메시지 보낸 시각
            cr3.msgId, -- 최근 메시지의 ID
            cr.sellItemid -- 채팅방과 연결된 판매글 ID
      FROM ChatUser cr 
        INNER JOIN (SELECT chatRoom, user FROM ChatUser WHERE user != ?) cr2 
          ON cr.chatRoom = cr2.chatRoom 
        INNER JOIN User u 
          ON cr2.user = u.id 
      INNER JOIN (SELECT chatRoom, message, createAt, c.id as msgId FROM Chat c WHERE id  = (SELECT max(id) FROM Chat WHERE chatRoom = c.chatRoom)) cr3 
        ON cr2.chatRoom = cr3.chatRoom WHERE cr.user = ? ORDER BY chatRoom`,
    [user, user]
  );
  res.status(200).json(rows);

};

export const createChatRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
