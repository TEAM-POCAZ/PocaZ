import express from "express";
import cors from "cors";
import { connect as mongoose_connect } from "mongoose";
import keys from "../config/keys";
import expressSession from "express-session";
import passport from "passport";
import authRouter from "../router/authRouter";
import db from "../db/database";

const API = "/api";

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

app.use(`${API}/auth`, authRouter);

app.listen(4000, async () => {
  console.log(`
      ################################################
      🛡️  Server listening on port: 4000
      ################################################
    `);
  const conn = await db.getPool().getConnection();
  // const insertAgencyId = await conn
  //   .query(
  //     `INSERT INTO Agency (name)
  //   VALUES ?`,
  //     [[["기획사1"], ["기획사2"]]]
  //   )
  //   .then((res: any) => {
  //     return res[0].insertId;
  //   });
  // console.log(insertAgencyId);

  // const insertArtistId = await conn.query(
  //   `INSERT INTO Artist(agency, artistGroup, stageName, realName) VALUES ?`,
  //   [
  //     [
  //       ["1", "1", "허허허", "진짜이름"],
  //       ["2", "2", "둘", "진짜이름2"],
  //     ],
  //   ]
  // );

  // //사용자 create
  // const insertId = await conn.query(
  //   `INSERT INTO User (username, email, nickname, profileImage, artist) VALUES ?`,
  //   [
  //     [
  //       ["배성재123", , "배성재(32세)", "wrongurl", "1"],
  //       ["김만중123", "manjoong@naver.com", "반장김만중", "wrongurl", 2],
  //     ],
  //   ]
  // );

  //사용자 read

  //사용자 update

  //사용자 delete
});
