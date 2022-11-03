import { Request, Router } from 'express';
import { PoolConnection } from 'mysql2/promise';
import passportSetup from '../utils/passport-setup';
import passport from 'passport';
import { urlencoded } from 'express';
import type { ErrorRequestHandler } from 'express';
import { User } from '../entity/user';
import { checkAuthenticated } from '../middleware/checkAuthenticated';
import { config } from '../config';
import db from '../db/database';
import { WithdrawalError } from '../error/WithdrawalError';
import { DbConnectionError } from '../error/DbConnectionError';

const REACT_URL: string = config.host.reactAppHostUrl;
passportSetup();

const authRouter = Router();

authRouter.get('/me', checkAuthenticated, (req, res) => {
  return res.json(req.user);
});

authRouter.get('/logout', checkAuthenticated, (req, res) => {
  req.logOut(() => {
    return res.json({ status: 'success' });
  });
});

authRouter.post(
  '/withdrawal',
  checkAuthenticated,
  async (req: Request, res) => {
    let conn: PoolConnection | null = null;
    try {
      conn = await db.getPool().getConnection();
      await User.softDelete(conn, req.user!.id);
      req.logOut(() => {});
      return res.json({ status: 'success' });
    } catch (err) {
      console.log(err);
    } finally {
      conn?.release();
    }
  }
);

authRouter.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

authRouter.get(
  '/signin-google',
  passport.authenticate('google'),
  (req, res) => {
    console.log('user in session cookie(google) >>> ', req.user);
    res.redirect(`${REACT_URL}/MyPage`);
  }
);

authRouter.get(
  '/twitter',
  passport.authenticate('oauth2', { scope: ['users.read', 'tweet.read'] })
);

authRouter.get(
  '/signin-twitter',
  passport.authenticate('oauth2'),
  (req, res) => {
    console.log('user in session cookie(twitter) >>> ', req.user);
    res.redirect(`${REACT_URL}/MyPage`);
  }
);

authRouter.get('/apple', passport.authenticate('apple'));

authRouter.post(
  '/signin-apple',
  urlencoded({ extended: true }),
  passport.authenticate('apple'),
  (req, res) => {
    console.log('user in session cookie(apple) >>> ', req.user);
    res.redirect(`${REACT_URL}/MyPage`);
  }
);

function jsonFriendlyErrorReplacer(key: any, value: any) {
  if (value instanceof Error) {
    return {
      // Pull all enumerable properties, supporting properties on custom Errors
      ...value,
      // Explicitly pull Error's non-enumerable properties
      name: value.name,
      message: value.message,
      stack: value.stack,
    };
  }

  return value;
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof WithdrawalError) {
    res.cookie('withdrawalUser', err.message);
    return res.redirect(`${REACT_URL}/withdrawalUser`);
  }
  if (err instanceof DbConnectionError) {
    res.cookie('error', JSON.stringify(err, jsonFriendlyErrorReplacer));
    return res.redirect(`${REACT_URL}/developmentError`);
  }
  res.status(401);
  res.json({ error: err.message });
};

authRouter.use(errorHandler);
export default authRouter;
