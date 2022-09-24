import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import db from '../db/database';

interface Test extends RowDataPacket {
  id: number;
  name: string;
}

export const sqlHandler = async <T extends RowDataPacket>(
  sql: string,
  list?: any
) => {
  const conn = await db.getPool().getConnection();
  try {
    await conn.beginTransaction();

    const [rows, fields]: [T[], FieldPacket[]] = await conn.execute(sql, list);
    await conn.commit();

    return rows;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

// FieldPacket[]
