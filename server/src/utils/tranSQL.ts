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
  posts: {
    lists: `SELECT p.id			            AS id,		  	-- post id
    p.title				          AS title, 		-- post title
    IFNULL(p.viewCount,0)   AS viewCount,	-- post view count
    p.content		  	        AS content,		-- post text
    u.id			  	          AS userId,		-- user key
    u.nickname			        AS nickname,	-- user nickname
    u.profileImage	        AS profileImage,-- user profile image
    p.createAt			        AS createAt,	-- post create Date
    IFNULL(rep.cnt,   0)    AS replyCnt,	-- post reply cnt
    IFNULL(likes.cnt, 0)    AS LikesCnt,  -- post likes cnt
    img.path	  		        AS filePath		-- post main img src `,
    listsFrom: `FROM Post p
    INNER JOIN User u ON p.user = u.id
    LEFT JOIN (SELECT post, count(*) as cnt
                FROM Reply
                GROUP BY post) rep on p.id = rep.post
    LEFT JOIN (SELECT pi.post  as post,
                    f.path   as path
                FROM (SELECT post, min(file) as main
                        FROM PostImage
                        GROUP BY post) pi
                LEFT JOIN File f ON pi.main = f.id
                ) img on p.id = img.post
    LEFT JOIN (SELECT post, count(user) cnt
                 FROM LikeManage
                GROUP BY post) likes on likes.post = p.id `,
    detail: `SELECT	p.title		  		      AS title,		  -- post title
          IFNULL(p.viewCount,0) 	AS viewCount,	-- post view count
          p.content	   			      AS text,	    -- post text
          p.createAt              AS createAt,  -- post create date
          p.deleteAt              AS deleteAt,  -- post create date
          u.id      			        AS userId,		-- user key
          u.nickname		          AS nickname,	-- user nickname
          u.profileImage          AS profileImage,-- user profile image
          IFNULL((SELECT count(*) cnt
             FROM LikeManage
            WHERE post = ?), 0) AS likesCnt     -- post like cnt`,
  },
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
          realName,
          agency,
          artistGroup
     FROM Artist
    WHERE 1 = 1 `,
  photocard: `
  SELECT pc.id        AS id,            -- photocard id
         pc.artist    AS artist,        -- artist of photocard
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
             u.nickname     AS nickname,    -- seller nickname
             u.profileImage AS profileImage,-- seller profile image
             pc.path        AS pocaImg,     -- poca image
             pc.name		    AS pocaName,	  -- photocard Name
             pc.description	AS description, -- photocard description
             pcs.price      AS price,		    -- photocard sell Price
             pcs.createAt   AS createAt,    -- sell post create date
             pcs.tradeStatus  AS tradeStatus  -- sell status
             `,
    detail: `
           ,pcs.title       AS title,       -- photocard sell title
            a.id           AS artistId,    -- artist pk
            ag.id          AS groupId,     -- group pk
            u.id           AS sellerId,    -- seller id
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
