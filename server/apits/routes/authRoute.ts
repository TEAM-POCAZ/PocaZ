import { Router } from "express";
import passportSetup from "../config/passport-setup";
import passport from "passport";
import { urlencoded } from "express";
passportSetup();

const authRoute = Router();

authRoute.get("/me", (req, res) => {
  res.json(req.user);
});

authRoute.get("/logout", (req, res) => {
  if (req.user) {
    req.logOut(() => {
      res.json({ status: "success" });
    });
  } else {
    res.json({ status: "error", message: "not logined before" });
  }
});

authRoute.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

authRoute.get("/signin-google", passport.authenticate("google"), (req, res) => {
  console.log("user in session cookie(google) >>> ", req.user);
  res.redirect("/LoginSuccessed");
});

authRoute.get(
  "/twitter",
  passport.authenticate("oauth2", { scope: ["users.read", "tweet.read"] })
);

authRoute.get(
  "/signin-twitter",
  passport.authenticate("oauth2"),
  (req, res) => {
    console.log("user in session cookie(twitter) >>> ", req.user);
    res.redirect("/LoginSuccessed");
  }
);

authRoute.get("/apple", passport.authenticate("apple"));

authRoute.post(
  "/signin-apple",
  urlencoded({ extended: true }),
  passport.authenticate("apple"),
  (req, res) => {
    console.log("user in session cookie(apple) >>> ", req.user);
    res.redirect("/LoginSuccessed");
  }
);
export default authRoute;
