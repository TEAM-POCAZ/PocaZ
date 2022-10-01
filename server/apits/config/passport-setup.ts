import passport, { Profile } from "passport";
import passport_google_oauth20 from "passport-google-oauth20";
import AppleStrategy from "@nicokaiser/passport-apple";
import OAuth2Strategy, {
  StrategyOptions,
  VerifyFunction,
  InternalOAuthError,
} from "passport-oauth2";
import keys from "./keys";
import { User, IUser } from "../models/user-model";
import * as fs from "fs";
import path from "path";
import { cwd } from "process";
import axios from "axios";

function passportSetup() {
  const GoogleStrategy = passport_google_oauth20.Strategy;

  class TwitterStrategy extends OAuth2Strategy {
    constructor(options: StrategyOptions, verifyCallback: VerifyFunction) {
      super(options, verifyCallback);
    }
    override userProfile = async (accessToken: string, done: any) => {
      try {
        const res = await axios.get("https://api.twitter.com/2/users/me", {
          headers: { authorization: `bearer ${accessToken}` },
          params: { "user.fields": `profile_image_url` },
        });
        const body = await res.data;
        const profile = body.data;
        profile._json = JSON.stringify(res.data);
        done(null, profile);
      } catch (err) {
        return done(new Error("Failed to parse user profile"));
      }
    };
  }
  passport.use(
    new TwitterStrategy(
      {
        authorizationURL: "https://twitter.com/i/oauth2/authorize",
        tokenURL: "https://api.twitter.com/2/oauth2/token",
        clientID: keys.twitter.consumerKey,
        clientSecret: keys.twitter.consumerSecret,
        callbackURL: `${keys.url}/api/auth/signin-twitter`,
        state: true,
        pkce: true,
        customHeaders: {
          Authorization: `Basic ${Buffer.from(
            `${keys.twitter.consumerKey}:${keys.twitter.consumerSecret}`
          ).toString("base64")}`,
        },
      },
      function (
        accessToken: String,
        refreshToken: String,
        profile: any,
        done: any
      ) {
        User.findOne({ twitterId: profile.id }).then((currentUser) => {
          console.log("twitter login>>", profile);
          if (currentUser) {
            //이미 db에 사용자가 있다. 생성할 필요 없음
            console.log("twitter user in DB is:", currentUser);
            done(null, currentUser);
          } else {
            //db에 사용자가 없다.
            new User({
              username: profile.username,
              twitterId: profile.id,
              thumbnail: profile.profile_image_url,
            })
              .save()
              .then((newUser) => {
                console.log(`new user created: ${newUser}`);
                console.log(profile._json.picture);
                done(null, newUser);
              });
          }
        });
      }
    )
  );

  passport.serializeUser((user: IUser, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: string, done) => {
    User.findById(id).then((user) => {
      done(null, user);
    });
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: `${keys.url}/api/auth/signin-google`,
      },
      (accessToken, refreshToken, profile, done) => {
        console.log("google login>>", profile);
        User.findOne({ googleId: profile.id }).then((currentUser) => {
          if (currentUser) {
            //이미 db에 사용자가 있다. 생성할 필요 없음
            console.log("google user in DB is:", currentUser);
            done(null, currentUser);
          } else {
            //db에 사용자가 없다.
            new User({
              username: profile.displayName,
              googleId: profile.id,
              thumbnail: profile._json.picture,
            })
              .save()
              .then((newUser) => {
                console.log(`new user created: ${newUser}`);
                console.log(profile._json.picture);
                done(null, newUser);
              });
          }
        });
      }
    )
  );
  passport.use(
    new AppleStrategy(
      {
        clientID: keys.apple.clientID,
        teamID: keys.apple.teamID,
        keyID: keys.apple.keyID,
        key: fs.readFileSync(path.join(cwd(), "AuthKey_6T39QCZ947.p8")),
        scope: ["email"],
        callbackURL: `${keys.url}/api/auth/signin-apple`,
        passReqToCallback: true,
      },
      (
        req: any,
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: Function
      ) => {
        console.log("apple login>>", profile);
        User.findOne({ appleId: profile.id }).then((currentUser) => {
          if (currentUser) {
            //이미 db에 사용자가 있다. 생성할 필요 없음
            console.log("apple user in DB is:", currentUser);
            done(null, currentUser);
          } else {
            const { id, email } = profile;
            //db에 사용자가 없다.
            new User({
              username: "applelogin_username",
              appleId: id,
            })
              .save()
              .then((newUser) => {
                console.log(`new user created: ${newUser}`);
                done(null, newUser);
              });
          }
        });
      }
    )
  );
}

export default passportSetup;
