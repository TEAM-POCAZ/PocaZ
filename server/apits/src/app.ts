import express from "express";
import cors from "cors";
import { connect as mongoose_connect } from "mongoose";
import { User, IUser } from "../models/user-model";
import keys from "../config/keys";
import expressSession from "express-session";
import passport from "passport";
import authRoute from "../routes/authRoute";

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
app.use(express.urlencoded({ extended: true })); //이거 없어도 될듯?

app.use(passport.initialize());
app.use(passport.session());

mongoose_run();
async function mongoose_run() {
  await mongoose_connect(keys.mongodb.dbURI);
  console.log("conneted to mongodb");
}

app.get("/", (req, res) => {
  res.send("hello world3");
});

app.use("/auth", authRoute);

app.listen(4000, () => {
  console.log(`
      ################################################
      🛡️  Server listening on port: 4000
      ################################################
    `);
});
