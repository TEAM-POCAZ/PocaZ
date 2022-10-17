import { Router } from "express";
import passportSetup from "../utils/passport-setup";
import passport from "passport";
import { urlencoded } from "express";
import type { ErrorRequestHandler } from "express";
import { User } from "../utils/user";
passportSetup();

const authRouter = Router();

authRouter.get("/me", (req, res) => {
  return res.json(req.user);
});

authRouter.get("/logout", (req, res) => {
  if (req.user) {
    req.logOut(() => {
      return res.json({ status: "success" });
    });
  } else {
    return res.json({ status: "error", message: "not logined before" });
  }
});

authRouter.post("/withdrawal", async (req, res) => {
  if (!req.user) {
    return res.json({ status: "error", message: "not logined user" });
  }
  await User.softDelete(req.user!.id!);
  req.logOut(() => {});
  return res.json({ status: "success" });
});

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

authRouter.get(
  "/signin-google",
  passport.authenticate("google"),
  (req, res) => {
    console.log("user in session cookie(google) >>> ", req.user);
    res.redirect("/LoginSuccessed");
  }
);

authRouter.get(
  "/twitter",
  passport.authenticate("oauth2", { scope: ["users.read", "tweet.read"] })
);

authRouter.get(
  "/signin-twitter",
  passport.authenticate("oauth2"),
  (req, res) => {
    console.log("user in session cookie(twitter) >>> ", req.user);
    res.redirect("/LoginSuccessed");
  }
);

authRouter.get("/apple", passport.authenticate("apple"));

authRouter.post(
  "/signin-apple",
  urlencoded({ extended: true }),
  passport.authenticate("apple"),
  (req, res) => {
    console.log("user in session cookie(apple) >>> ", req.user);
    res.redirect("/LoginSuccessed");
  }
);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(401);
  res.json({ error: err.message });
};

authRouter.use(errorHandler);
export default authRouter;
