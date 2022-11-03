import { RowDataPacket, OkPacket } from 'mysql2';
import { PoolConnection } from 'mysql2/promise';
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
  static async selectAll(conn: PoolConnection): Promise<IUser[]> {
    const [users] = await conn.query<IUser[]>('SELECT * FROM User');
    return users;
  }
  static async selectById(conn: PoolConnection, id: number | string) {
    const [user] = await conn.query<IUser[]>(
      'SELECT * FROM User where id = ?',
      [id]
    );
    return user[0];
  }

  static async selectByUsername(conn: PoolConnection, username: string) {
    const [user] = await conn.query<IUser[]>(
      'SELECT * FROM User where username = ?',
      [username]
    );
    return user[0];
  }
  static async create(conn: PoolConnection, user: UserCreationDto) {
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
    return User.selectById(conn, insertId);
  }
  static async update(conn: PoolConnection, user: UserUpdateDto) {
    await conn.query<OkPacket>(
      `UPDATE User SET email = ?, nickname = ?, profileImage = ?, artist = ?, updateAt=now() WHERE id = ?`,
      [user.email, user.nickname, user.profileImage, user.artist, user.id]
    );
    return await User.selectById(conn, user.id);
  }

  static async softDelete(conn: PoolConnection, id: number | string) {
    const [{ affectedRows }] = await conn.query<OkPacket>(
      `UPDATE User
        SET
        deleteAt = now()
      WHERE id = ?`,
      [id]
    );
    return { affectedRows };
  }

  static async softDeleteRollback(conn: PoolConnection, id: number | string) {
    const [{ affectedRows }] = await conn.query<OkPacket>(
      `UPDATE User
        SET
        deleteAt = null
      WHERE id = ?`,
      [id]
    );
    return { affectedRows };
  }
  static isSoftDeleted(user: UserDto) {
    return !!user.deleteAt;
  }

  static async hardDelete(conn: PoolConnection, id: number | string) {
    const [{ affectedRows }] = await conn.query<OkPacket>(
      `DELETE FROM User
      WHERE id = ?`,
      [id]
    );
    return { affectedRows };
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
