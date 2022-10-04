import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import db from '../db/database';

export const sqlInsertHandler = async (sql: string, list?: any) => {
  const conn = await db.getPool().getConnection();
  try {
    await conn.beginTransaction();

    const [rows]: [ResultSetHeader, FieldPacket[]] = await conn.execute(
      sql,
      list
    );
    await conn.commit();

    return rows;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

export const sqlSelectHandler = async <T extends RowDataPacket>(
  sql: string,
  list?: any
) => {
  const conn = await db.getPool().getConnection();
  try {
    const [rows]: [T[], FieldPacket[]] = await conn.execute(sql, list);
    return rows;
  } catch (err) {
    throw err;
  } finally {
    conn.release();
  }
};
