import express, { urlencoded } from "express";
import passportSetup from "../config/passport-setup";
import cors from "cors";
import { connect as mongoose_connect } from "mongoose";
import { User, IUser } from "../models/user-model";
import keys from "../config/keys";
import expressSession from "express-session";
import passport from "passport";

const app = express();
app.use(cors({}));
app.use(
  expressSession({
    secret: [keys.session.cookieKey],
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
    proxy: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

passportSetup();

mongoose_run();
async function mongoose_run() {
  await mongoose_connect(keys.mongodb.dbURI);
  console.log("conneted to mongodb");
}

app.get("/", (req, res) => {
  res.send("hello world3");
});

app.get("/me", (req, res) => {
  res.json(req.user);
});

app.get("/logout", (req, res) => {
  if (req.user) {
    req.logOut(() => {
      res.json({ status: "success" });
    });
  } else {
    res.json({ status: "error", message: "not logined before" });
  }
});

app.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get("/signin-google", passport.authenticate("google"), (req, res) => {
  console.log(req.user);
  res.redirect("/LoginSuccessed");
});

app.get(
  "/twitter",
  passport.authenticate("oauth2", { scope: ["users.read", "tweet.read"] })
);

app.get("/signin-twitter", passport.authenticate("oauth2"), (req, res) => {
  res.redirect("/LoginSuccessed");
});

app.get("/apple", passport.authenticate("apple"));

app.post(
  "/signin-apple",
  express.urlencoded(),
  passport.authenticate("apple"),
  (req, res) => {
    res.redirect("/LoginSuccessed");
  }
);

app.listen(4000, () => {
  console.log(`
      ################################################
      🛡️  Server listening on port: 4000
      ################################################
    `);
});
