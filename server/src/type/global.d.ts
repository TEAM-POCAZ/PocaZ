/* eslint-disable @typescript-eslint/no-empty-interface */
import { UserDto } from '../entity/user';

declare global {
  declare namespace Express {
    export interface User extends UserDto {}
    export interface Request {
      user: User;
    }
  }
}

export {};
