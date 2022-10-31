import { RowDataPacket } from "mysql2";

export interface IPosts extends RowDataPacket {
    id: number,
    title: string,
    viewCount: number,
    content: string,
    userId: number,
    nickname: string,
    profileImage: string,
    createAt: string,
    replyCnt: number,
    LikesCnt: number,
    filePath: string
  }