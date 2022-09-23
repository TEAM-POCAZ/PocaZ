import pool from '../controller/db';

const tranSQL = {
  // Method
  getOne: async (
    sql: string,
    list?: (string | number | (string | number)[])[]
  ) => {
    const conn = await pool.getConnection();
    const [result] = await conn.query(sql, list);
    return result;
  },
  /**
   * function that post only one post.
   * @param {string}sql - put standard SQL syntax with '?'
   * @param {(string | number | (string | number)[])[]}list - put params in array type
   * @returns {number} get primary key of posted one
   */
  postOne: async (
    sql: string,
    list?: (string | number | (string | number)[])[]
  ) => {
    const conn = await pool.getConnection();
    const insertId: string = await conn
      .query(sql, list)
      .then((res: any) => {
        return res[0].insertId;
      })
      .catch((err) => {
        conn.rollback();
        conn.release();
        throw err;
      })
      .finally(() => {
        conn.release();
      });
    return insertId;
  },
  putOne: async (
    sql: string,
    list?: (string | number | (string | number)[])[]
  ) => {
    const conn = await pool.getConnection();
    try {
      conn.beginTransaction();
      conn.query(sql, list);
      conn.commit();
    } catch (err) {
      await conn.rollback();
      conn.release();
      throw err;
    } finally {
      conn.release();
    }
  },
  getMany: async (
    ...args: [sql: string, list?: (string | number | (string | number)[])[]][]
  ) => {
    const conn = await pool.getConnection();
    const result: any[] = [];
    args.forEach(async ([sql, list]) => {
      result.push(await conn.query(sql, list));
    });
    return result;
  },
  /**
   * POST more than one query on one transaction
   * @param {[sql: string, list?: (string | number | (string | number)[])[]]} args
   */
  queryMany: async (
    ...args: [sql: string, list?: (string | number | (string | number)[])[]][]
  ) => {
    const conn = await pool.getConnection();
    try {
      conn.beginTransaction();
      args.forEach(async ([sql, list]) => {
        await conn.query(sql, list);
      });
      conn.commit();
    } catch (err) {
      await conn.rollback();
      conn.release();
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
   INNER JOIN USER u ON r.user = u.id
   WHERE  post = ?`,
  agency: `
   SELECT id, name
     FROM Agency
    WHERE 1 = 1`,
};

export { tranSQL };
