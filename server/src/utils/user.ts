import { RowDataPacket } from 'mysql2';
import { tranSQL } from './tranSQL2';

interface UserCreationDto {
  username?: string;
  email?: string;
  nickname?: string;
  profileImage?: string;
  artist?: number;
}
interface UserUpdateDto {
  id?: number;
  email?: string;
  nickname?: string;
  profileImage?: string;
  artist?: number;
}
interface UserDto {
  id?: number;
  username?: string; //nn
  email?: string;
  nickname?: string; //nn
  profileImage?: string;
  deleteAt?: string;
  score?: number;
  createAt?: string;
  updateAt?: string;
  artist?: number;
}

interface IUser extends RowDataPacket, UserDto {}

class User {
  constructor() {}

  static async create(users: UserCreationDto[]) {
    const result = tranSQL.create(
      `INSERT INTO User (username, email, nickname, profileImage, artist)
        VALUES ?`,
      [
        users.map((user: UserCreationDto) => {
          const { username, email, profileImage, artist } = user;
          let { nickname } = user;
          console.log(email);
          console.log(profileImage);
          if (!nickname) {
            nickname = nicknameGenerator(10);
          }
          return [username, email, nickname, profileImage, artist];
        }),
      ]
    );
    return result;
  }
  static async update(user: UserUpdateDto) {
    const { email, nickname, profileImage, artist, id } = user;
    const arr: any[] = [];
    if (email) arr.push(email);
    if (nickname) arr.push(nickname);
    if (profileImage) arr.push(profileImage);
    if (artist) arr.push(artist);
    if (id) arr.push(id);
    return tranSQL.updateOrDelete(
      `UPDATE User
        SET 
        ${email ? 'email = ?,' : ''}
        ${nickname ? 'nickname = ?,' : ''}
        ${profileImage ? 'profileImage = ?,' : ''}
        ${artist ? 'artist = ?,' : ''}
        updateAt = now()
      WHERE 1 = 1
            ${tranSQL.where('id')}`,
      arr
    );
  }

  static async softDelete(id: number) {
    return tranSQL.updateOrDelete(
      `UPDATE User
        SET 
        deleteAt = now()
      WHERE 1 = 1
            ${tranSQL.where('id')}`,
      [id]
    );
  }

  static isSoftDeleted(user: UserDto) {
    return !!user.deleteAt;
  }

  static async hardDelete(id: number) {
    const result = tranSQL.updateOrDelete(
      `DELETE FROM User
    WHERE 1 = 1
   ${tranSQL.where('id')}`,
      [id]
    );
    return result;
  }
  static async selectById(id: number) {
    const users: Promise<IUser[]> = tranSQL.select(
      `${tranSQL.user}${tranSQL.where('id')}`,
      [id]
    );
    return users;
  }

  static async selectByUsername(username: string) {
    const users: Promise<IUser[]> = tranSQL.select(
      `${tranSQL.user}${tranSQL.where('username')}`,
      [username]
    );
    return users;
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
