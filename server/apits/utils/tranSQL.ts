import db from "../db/database";

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
};
export { tranSQL };
