import { RowDataPacket, OkPacket } from 'mysql2';
import db from '../db/database';

interface UserCreationDto {
  username: string;
  email?: string;
  nickname?: string;
  profileImage?: string;
  artist?: number;
}
interface UserUpdateDto {
  id: number;
  email?: string;
  nickname?: string;
  profileImage?: string;
  artist?: number;
}
interface UserDto {
  id: number;
  username: string; //nn
  email?: string;
  nickname: string; //nn
  profileImage?: string;
  deleteAt?: string;
  score?: number;
  createAt: string;
  updateAt?: string;
  artist?: number;
}

interface IUser extends RowDataPacket, UserDto {} //select용도
type ID = RowDataPacket[] | string;
class User {
  static async selectAll(): Promise<IUser[]> {
    const conn = await db.getPool().getConnection();
    try {
      const [users] = await conn.query<IUser[]>('SELECT * FROM User');
      return users;
    } finally {
      conn.release();
    }
  }
  static async selectById(id: number | string) {
    const conn = await db.getPool().getConnection();
    try {
      const [user] = await conn.query<IUser[]>(
        'SELECT * FROM User where id = ?',
        [id]
      );
      return user[0];
    } finally {
      conn.release();
    }
  }

  static async selectByUsername(username: string) {
    const conn = await db.getPool().getConnection();
    try {
      const [user] = await conn.query<IUser[]>(
        'SELECT * FROM User where username = ?',
        [username]
      );
      return user[0];
    } finally {
      conn.release();
    }
  }
  static async create(user: UserCreationDto) {
    const conn = await db.getPool().getConnection();
    try {
      const [{ insertId }] = await conn.query<OkPacket>(
        `INSERT INTO User (username, email, nickname, profileImage, artist)
        VALUES (?,?,?,?,?)`,
        [
          user.username,
          user.email,
          user.nickname ?? nicknameGenerator(6),
          user.profileImage,
          user.artist,
        ]
      );
      return User.selectById(insertId);
    } finally {
      conn.release();
    }
  }
  static async update(user: UserUpdateDto) {
    const conn = await db.getPool().getConnection();
    try {
      await conn.query<OkPacket>(
        `UPDATE User SET email = ?, nickname = ?, profileImage = ?, artist = ?, updateAt=now() WHERE id = ?`,
        [user.email, user.nickname, user.profileImage, user.artist, user.id]
      );
      return User.selectById(user.id);
    } finally {
      conn.release();
    }
  }

  static async softDelete(id: number | string) {
    const conn = await db.getPool().getConnection();
    try {
      const [{ affectedRows }] = await conn.query<OkPacket>(
        `UPDATE User
        SET
        deleteAt = now()
      WHERE id = ?`,
        [id]
      );
      return { affectedRows };
    } finally {
      conn.release();
    }
  }
  static isSoftDeleted(user: UserDto) {
    return !!user.deleteAt;
  }

  static async hardDelete(id: number | string) {
    const conn = await db.getPool().getConnection();
    try {
      const [{ affectedRows }] = await conn.query<OkPacket>(
        `DELETE FROM User
      WHERE id = ?`,
        [id]
      );
      return { affectedRows };
    } finally {
      conn.release();
    }
  }
}
function nicknameGenerator(length: number) {
  const alpha = 'abcdefghijklmnopqrstuvwxyz';
  let str = '';
  for (let i = 0; i < length; i++)
    str += alpha[Math.floor(Math.random() * alpha.length)];
  return str;
}

export { User };
export type { IUser, UserCreationDto, UserUpdateDto, UserDto };
