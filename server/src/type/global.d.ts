import { UserDto } from '../entity/user';

declare global {
  namespace Express {
    interface User extends UserDto {
      id: number;
    }
  }
}

export {};
