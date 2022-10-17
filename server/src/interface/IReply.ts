import { RowDataPacket } from 'mysql2/promise';

export interface IReply extends RowDataPacket {
  id: number;
  pid: number | null;
  user: number;
  nickname: string;
  profileImage: string;
  content: string;
  createAt: any;
}
export interface IReplyM extends IReply {
  reply: IReply[];
}
