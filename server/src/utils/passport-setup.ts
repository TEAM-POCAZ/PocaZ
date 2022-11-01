import passport from 'passport';
import passport_google_oauth20 from 'passport-google-oauth20';

import AppleStrategy from '@nicokaiser/passport-apple';

import OAuth2Strategy, {
  StrategyOptions,
  VerifyFunction,
} from 'passport-oauth2';
import { User, UserCreationDto, UserDto } from '../entity/user';
import * as fs from 'fs';
import path from 'path';
import { cwd } from 'process';
import axios from 'axios';
import { config } from '../config';
import db from '../db/database';
import { PoolConnection } from 'mysql2/promise';

function passportSetup() {
  const GoogleStrategy = passport_google_oauth20.Strategy;

  class TwitterStrategy extends OAuth2Strategy {
    constructor(options: StrategyOptions, verifyCallback: VerifyFunction) {
      super(options, verifyCallback);
    }
    override userProfile = async (accessToken: string, done: any) => {
      try {
        const res = await axios.get('https://api.twitter.com/2/users/me', {
          headers: { authorization: `bearer ${accessToken}` },
          params: { 'user.fields': `profile_image_url` },
        });
        const body = await res.data;
        const profile = body.data;
        profile._json = JSON.stringify(res.data);
        done(null, profile);
      } catch (err) {
        return done(new Error('Failed to parse user profile'));
      }
    };
  }
  passport.use(
    new TwitterStrategy(
      {
        authorizationURL: 'https://twitter.com/i/oauth2/authorize',
        tokenURL: 'https://api.twitter.com/2/oauth2/token',
        clientID: config.twitter.consumerKey,
        clientSecret: config.twitter.consumerSecret,
        callbackURL: `${config.host.url}/api/auth/signin-twitter`,
        state: true,
        pkce: true,
        customHeaders: {
          Authorization: `Basic ${Buffer.from(
            `${config.twitter.consumerKey}:${config.twitter.consumerSecret}`
          ).toString('base64')}`,
        },
      },
      async function (
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: any
      ) {
        const username = `twitter#${profile.id}`;
        let conn: PoolConnection | null = null;
        try {
          conn = await db.getPool().getConnection();
          let user = await User.selectByUsername(conn, username);
          if (user) {
            console.log('twitter login user exists in DB, ', user);
          } else {
            const userCreationDto: UserCreationDto = {
              username,
              profileImage: profile.profile_image_url,
            };
            user = await User.create(conn, userCreationDto);
            console.log('twitter login user created, id: ', user);
          }
          if (User.isSoftDeleted(user)) {
            done(new Error('탈퇴한 사용자입니다.'));
          } else {
            done(null, user);
          }
        } catch (err) {
          console.log(err);
          done('connection error');
        } finally {
          conn?.release();
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    let conn: PoolConnection | null = null;
    try {
      conn = await db.getPool().getConnection();
      const user = await User.selectById(conn, id);
      done(null, user);
    } catch (err) {
      console.log(err);
    } finally {
      conn?.release();
    }
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: `${config.host.url}/api/auth/signin-google`,
      },
      async (accessToken, refreshToken, profile, done) => {
        const username = `google#${profile.id}`;
        let conn: PoolConnection | null = null;
        try {
          conn = await db.getPool().getConnection();
          let user = await User.selectByUsername(conn, username);
          if (user) {
            console.log('google login user exists in DB, ', user);
          } else {
            const userCreationDto: UserCreationDto = {
              username,
              email: profile._json.email,
              profileImage: profile._json.picture,
            };
            user = await User.create(conn, userCreationDto);
            console.log('google login user created, ', user);
          }
          if (User.isSoftDeleted(user)) {
            done(new Error('탈퇴한 사용자입니다.'));
          } else {
            done(null, user);
          }
        } catch (err) {
          console.log(err);
          done('connection error');
        } finally {
          conn?.release();
        }
      }
    )
  );
  passport.use(
    new AppleStrategy(
      {
        clientID: config.apple.clientID,
        teamID: config.apple.teamID,
        keyID: config.apple.keyID,
        key: fs.readFileSync(path.join(cwd(), 'AuthKey_6T39QCZ947.p8')),
        scope: ['email'],
        callbackURL: `${config.host.url}/api/auth/signin-apple`,
        passReqToCallback: true,
      },
      async (
        req: any,
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: any
      ) => {
        const username = `apple#${profile.id}`;
        let conn: PoolConnection | null = null;
        try {
          conn = await db.getPool().getConnection();

          let user = await User.selectByUsername(conn, username);
          if (user) {
            console.log('apple login user exists in DB, ', user);
          } else {
            const userCreationDto: UserCreationDto = {
              username: username,
              email: profile.email,
              profileImage: profile.profile_image_url,
            };
            user = await User.create(conn, userCreationDto);
            console.log('apple login user created, ', user);
          }
          if (User.isSoftDeleted(user)) {
            done(new Error('탈퇴한 사용자입니다.'));
          } else {
            done(null, user);
          }
        } catch (err) {
          console.log(err);
          done('connection error');
        } finally {
          conn?.release();
        }
      }
    )
  );
}

export default passportSetup;
