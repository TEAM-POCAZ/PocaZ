import { Router } from 'express';
import passportSetup from '../utils/passport-setup';
import passport from 'passport';
import { urlencoded } from 'express';
import type { ErrorRequestHandler } from 'express';
import { User } from '../utils/user';
import { checkAuthenticated } from '../middleware/checkAuthenticated';
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

authRouter.post('/withdrawal', checkAuthenticated, async (req, res) => {
  if (!req.user) {
    throw new Error('not logined before');
  }
  // await User.softDelete(req.user!.id!);
  req.logOut(() => {});
  return res.json({ status: 'success' });
});

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
    res.redirect('/LoginSuccessed');
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
    res.redirect('/LoginSuccessed');
  }
);

authRouter.get('/apple', passport.authenticate('apple'));

authRouter.post(
  '/signin-apple',
  urlencoded({ extended: true }),
  passport.authenticate('apple'),
  (req, res) => {
    console.log('user in session cookie(apple) >>> ', req.user);
    res.redirect('/LoginSuccessed');
  }
);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(401);
  res.json({ error: err.message });
};

authRouter.use(errorHandler);
export default authRouter;
