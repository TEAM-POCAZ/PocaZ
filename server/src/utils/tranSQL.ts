import pool from '../controller/db';

const tranSQL = {
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
    const insertId = await conn
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
};

export { tranSQL };
