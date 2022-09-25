import db from '../db/database';

export const sqlHandler = async (sql: string, list?: any): Promise<any> => {
  const conn = await db.getPool().getConnection();
  try {
    await conn.beginTransaction();
    const result = await conn.execute(sql, list);
    await conn.commit();

    return result;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};
