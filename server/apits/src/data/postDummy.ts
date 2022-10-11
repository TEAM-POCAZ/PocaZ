import { RowDataPacket, FieldPacket } from "mysql2";
import db from "../../db/database";

/**
 * usage
 */

console.log("숫자를 입력하지 않으면 기본으로 100개씩 생성됩니다.");
console.log("usage: ts-node src/data/postDummy.ts [number]");

const argsNumber = 100;

const 성 =
  "김이박최정강조윤장임한오서신권황안송류전홍고문양손배조백허유남심노정하곽성차주우구신임나전민유진지엄채원천방공강현함변염양변여추노도소신석선설마길주연방위표명기반왕금옥육인맹제모장남탁국여진어은편구용";
const 이름 =
  "가강건경고관광구규근기길나남노누다단달담대덕도동두라래로루리마만명무문미민바박백범별병보빛사산상새서석선설섭성세소솔수숙순숭슬승시신아안애엄여연영예오옥완요용우원월위유윤율으은의이익인일잎자잔장재전정제조종주준중지진찬창채천철초춘충치탐태택판하한해혁현형혜호홍화환회효훈휘희운모배부림봉혼황량린을비솜공면탁온디항후려균묵송욱휴언령섬들견추걸삼열웅분변양출타흥겸곤번식란더손술훔반빈실직흠흔악람뜸권복심헌엽학개롱평늘늬랑얀향울련";
const alpha = "abcdefghijklmnopqrstuvwxyz";
let static_i = 0;
const autoIncrement = () => {
  return static_i++;
};

const strDummy = (length: number) => {
  let str = "";
  for (let i = 0; i < length; i++)
    str += alpha[Math.floor(Math.random() * alpha.length)];
  return str;
};

const userElement = (artistCnt: number) => [
  `username${autoIncrement()}`,
  `${strDummy(Math.floor(Math.random() * 2 + 3))}${Math.floor(
    Math.random() * 10
  )}${Math.floor(Math.random() * 10)}@${strDummy(
    Math.floor(Math.random() * 4 + 3)
  )}.com`,

  성[Math.floor(Math.random() * 성.length)] +
    이름[Math.floor(Math.random() * 이름.length)] +
    이름[Math.floor(Math.random() * 이름.length)],
  "",
  Math.floor(Math.random() * artistCnt) + 1,
]; //(email, nickname, profileImage, artist)

const postElement = (userCnt: number, categoryCnt: number) => [
  // userNumber
  Math.floor(Math.random() * userCnt) + 1,
  // category
  Math.floor(Math.random() * categoryCnt) + 1,
  //title
  `${strDummy(3)}${strDummy(20)}`,
  //content
  `${strDummy(100)}${strDummy(100)}`,
];
const sellElement = (userCnt: number, pcCnt: number) => [
  // photocard number
  Math.floor(Math.random() * pcCnt) + 1,
  // userNumber
  Math.floor(Math.random() * userCnt) + 1,
  //title
  Array(Math.floor(Math.random() * 20 + 3))
    .fill("")
    .reduce(
      (id, _) => (id += alpha[Math.floor(Math.random() * alpha.length)]),
      ""
    ),
  Math.floor(Math.random() * userCnt) * 100,
  0,
  //content
  `${strDummy(100)}${strDummy(100)}`,
  1,
];

(async () => {
  // const conn = await pool.getConnection();
  const conn = await db.getPool().getConnection();

  // user Create sql

  try {
    const [[{ cnt: artistCnt }]]: [RowDataPacket[], FieldPacket[]] =
      await conn.query(`SELECT count(*) cnt FROM Artist`);
    const value = [];
    for (let i = 0; i < argsNumber; i += 1) value.push(userElement(artistCnt));
    conn.query(
      `INSERT INTO User (username, email, nickname, profileImage, artist)
       VALUES ?`,
      [value]
    );
    conn.commit();
    console.log(`added ${argsNumber} user(s)!!!`);
  } catch (err) {
    await conn.rollback();
    conn.release();
    throw err;
  }

  // Post Create SQL

  try {
    await conn.beginTransaction();
    const value = [];
    const [[{ cnt: userCnt }]]: [RowDataPacket[], FieldPacket[]] =
      await conn.query(`SELECT count(*) cnt FROM User`);
    const [[{ cnt: categoryCnt }]]: [RowDataPacket[], FieldPacket[]] =
      await conn.query(`SELECT count(*) cnt FROM PostCategory`);
    for (let i = 0; i < argsNumber; i += 1)
      value.push(postElement(userCnt, categoryCnt));
    const [[{ cnt: postCnt }]]: [RowDataPacket[], FieldPacket[]] =
      await conn.query(`SELECT count(*) cnt FROM Post`);
    await conn.query(
      `INSERT INTO Post (user, category, title, content)
       VALUES ?`,
      [value]
    );
    const [[{ cnt: fileCnt }]]: [RowDataPacket[], FieldPacket[]] =
      await conn.query(`SELECT count(*) cnt FROM File`);

    await conn.query(
      `
          INSERT INTO File (name, path)
          VALUES ?`,
      [
        ((fileNumber) => {
          const filelist = [];
          for (let i = 1; i <= fileNumber; i += 1)
            filelist.push([
              `${i}.jpeg`,
              `https://byeolikim.github.io/pocaz-frame/img/${
                Math.floor(Math.random() * 20) + 1
              }.jpeg`,
            ]);
          return filelist;
        })(argsNumber),
      ]
    );

    await conn.query(
      `INSERT INTO PostImage (post, file)
          VALUES ?`,
      [
        ((fileNumber) => {
          const linkList = [];
          for (let i = 1; i <= fileNumber; i += 1)
            linkList.push([i + postCnt, i + fileCnt]);
          return linkList;
        })(argsNumber),
      ]
    );
    await conn.commit();
    console.log(`inserted ${argsNumber} Post!!`);
  } catch (err) {
    await conn.rollback();
    throw err;
  }

  // sell Post create SQL

  try {
    await conn.beginTransaction();
    const value = [];
    const [[{ cnt: userCnt }]]: [RowDataPacket[], FieldPacket[]] =
      await conn.query(`SELECT count(*) cnt FROM User`);
    const [[{ cnt: pcCnt }]]: [RowDataPacket[], FieldPacket[]] =
      await conn.query(`SELECT count(*) cnt FROM Photocard`);
    for (let i = 0; i < argsNumber; i += 1)
      value.push(sellElement(userCnt, pcCnt));
    // console.log(value);

    const [[{ cnt: sellCnt }]]: [RowDataPacket[], FieldPacket[]] =
      await conn.query(`SELECT count(*) cnt FROM PhotocardSellArticle`);
    await conn.query(
      `INSERT INTO PhotocardSellArticle (photocard, user, title, price, viewCount, description, tradeStatus)
       VALUES ?`,
      [value]
    );

    const [[{ cnt: fileCnt }]]: [RowDataPacket[], FieldPacket[]] =
      await conn.query(`SELECT count(*) cnt FROM File`);

    // insert file
    await conn.query(
      `INSERT INTO File (name, path)
       VALUES ?`,
      [
        ((fileNumber) => {
          const filelist = [];
          for (let i = 1; i <= fileNumber; i += 1)
            filelist.push([
              `${i}.jpeg`,
              `https://byeolikim.github.io/pocaz-frame/img/${
                Math.floor(Math.random() * 20) + 1
              }.jpeg`,
            ]);
          return filelist;
        })(argsNumber),
      ]
    );

    await conn.query(
      `INSERT INTO PhotocardImage (file, PhotocardSellArticle)
       VALUES ?`,
      [
        ((fileNumber) => {
          const linkList = [];
          for (let i = 1; i <= fileNumber; i += 1)
            linkList.push([i + fileCnt, i + sellCnt]);
          return linkList;
        })(argsNumber),
      ]
    );
    await conn.commit();
    console.log(`inserted ${argsNumber} Sell Post(s)!!`);
  } catch (err) {
    await conn.rollback();
    conn.release();
    throw err;
  } finally {
    conn.release();
    // pool.end();
    conn.destroy();
  }
})();
