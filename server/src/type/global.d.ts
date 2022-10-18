import { UserDto } from "../utils/user";

declare global {
  namespace Express {
    export interface User extends UserDto {}
  }
}
export {};
