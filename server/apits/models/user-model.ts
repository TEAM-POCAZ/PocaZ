import { model, Schema } from "mongoose";
interface IUser {
  username?: string;
  googleId?: string;
  twitterId?: string;
  appleId?: string;
  thumbnail?: string;
  id?: string;
}

const userSchema = new Schema<IUser>({
  username: String,
  googleId: String,
  twitterId: String,
  appleId: String,
  thumbnail: String,
});

const User = model<IUser>("User", userSchema);

export { User };
export type { IUser };
