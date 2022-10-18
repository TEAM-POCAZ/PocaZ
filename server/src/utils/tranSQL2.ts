import { RowDataPacket } from "mysql2";
import db from "../db/database";

const tranSQL = {
  // Method collections
  select: async <T extends RowDataPacket[]>(
    sql: string,
    list?: any
  ): Promise<T> => {
    const conn = await db.getPool().getConnection();
    try {
      const [result, _]: [T, any] = await conn.query(sql, list);
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
  create: async (sql: string, list?: any) => {
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
  updateOrDelete: async (sql: string, list?: any) => {
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

  /**
   * POST more than one execute on one transaction
   * @param {[sql: string, list?: any]} args
   */
  nonQueryMany: async (...args: [sql: string, list?: any][]) => {
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
  user: `
  SELECT id,
         username,
         email,
         nickname,
         profileImage,
         deleteAt,
         score,
         artist,
         createAt,
         updateAt
    FROM User
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
};
export { tranSQL };
