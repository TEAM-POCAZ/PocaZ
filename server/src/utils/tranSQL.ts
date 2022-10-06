import db from '../db/database';

const tranSQL = {
  // Method collections
  getOne: async (sql: string, list?: any) => {
    const conn = await db.getPool().getConnection();
    try {
      const [result] = await conn.query(sql, list);
      return result;
    } catch (err) {
      throw err;
    } finally {
      conn.release();
    }
  },
  /**
   * function that post only one post.
   * @param {string}sql - put standard SQL syntax with '?'
   * @param {any}list - put params in array type
   * @returns {number} get primary key of posted one
   */
  postOne: async (sql: string, list?: any) => {
    const conn = await db.getPool().getConnection();
    const insertId: string = await conn
      .query(sql, list)
      .then((res: any) => {
        return res[0].insertId;
      })
      .catch((err) => {
        conn.rollback();
        throw err;
      })
      .finally(() => {
        conn.release();
      });
    return insertId;
  },
  putOne: async (sql: string, list?: any) => {
    const conn = await db.getPool().getConnection();
    try {
      await conn.beginTransaction();
      await conn.execute(sql, list);
      await conn.commit();
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  },
  // getMany: async (...args: [sql: string, list?: any][]) => {
  //   const conn = await db.getPool().getConnection();
  //   const result: any[] = [];
  //   args.forEach(async ([sql, list]) => {
  //     result.push(await conn.execute(sql, list));
  //   });
  //   return result;
  // },
  /**
   * POST more than one execute on one transaction
   * @param {[sql: string, list?: any]} args
   */
  queryMany: async (...args: [sql: string, list?: any][]) => {
    const conn = await db.getPool().getConnection();
    try {
      conn.beginTransaction();
      args.forEach(async ([sql, list]) => {
        await conn.query(sql, list);
      });
      conn.commit();
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  },
  where: (column: string) => `AND ${column} = ?`,
  // Sql Series
  reply: `
  SELECT	r.id,           -- reply id
          r.pid,          -- parent of reply
          r.user,         -- user id
          u.nickname,     -- user nickname
          u.profileImage, -- user profile img
          r.content,      -- reply content
          r.createAt      -- reply created Date
    FROM  Reply r
   INNER JOIN User u ON r.user = u.id
   WHERE  1 = 1`,
  agency: `
   SELECT id, name
     FROM Agency
    WHERE 1 = 1 `,
  artistGroup: `
   SELECT id,
          englishName,
          koreanName,
          grouplogoUrl
     FROM ArtistGroup
    WHERE 1 = 1 `,
  artist: `
   SELECT id,
          stageName,
          realName
     FROM Artist
    WHERE 1 = 1 `,
  photocard: `
  SELECT pc.id        AS id,            -- photocard id
         a.stageName  AS stageName,     -- artist stage name
         pc.path      AS img,           -- photocard img src
         pc.name      AS name,          -- photocard name
         pc.description AS description, -- photocard description
         pc.createAt  AS createAt       -- photocard published
    FROM Photocard pc
   INNER JOIN Artist a on pc.artist = a.id
   WHERE 1 = 1 `,
  galmang: `
   SELECT id, user, photocard
     FROM GalmangPhotoCard
    WHERE 1 = 1 `,

  market: {
    main: `
      SELECT pcs.id         AS id,          -- sell post id
             a.stageName    AS stageName,	  -- current stage Name
             ag.englishName AS groupName,	  -- current group Name
             u.nickname     AS nickname,    -- user nickname
             u.profileImage AS profileImage,-- user profile image
             pc.path        AS pocaImg,     -- poca image
             pc.name		    AS pocaName,	  -- photocard Name
             pc.description	AS description, -- photocard description
             pcs.price      AS price,		    -- photocard sell Price
             pcs.tradeStatus  AS tradeStatus  -- sell status
             `,
    detail: `
            ,pcs.title       AS title,       -- photocard sell title
             pcs.description AS sellDesc     -- photocard sell description`,
    from: `
     FROM PhotocardSellArticle pcs
        INNER JOIN User u ON pcs.user = u.id
        LEFT JOIN Photocard pc on pcs.photocard = pc.id
             -- LEFT JOIN because photocard seller want to submit
             -- would not exists on POCAZ Database
        LEFT JOIN Artist a on pc.artist = a.id
        LEFT JOIN ArtistGroup ag on a.artistGroup = ag.id
       WHERE 1 = 1`,
  },
};

export { tranSQL };
