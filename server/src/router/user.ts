import { Router } from 'express';
import { DbConnectionError } from '../error/DbConnectionError';
import type { ErrorRequestHandler } from 'express';
import { PoolConnection } from 'mysql2/promise';
import db from '../db/database';
import { config } from '../config';
const REACT_URL: string = config.host.reactAppHostUrl;

import { User, UserCreationDto, UserUpdateDto } from '../entity/user';

const userRouter = Router();

userRouter.get('/', async (req, res) => {
  let conn: PoolConnection | null = null;
  try {
    conn = await db.getPool().getConnection();
    return res.json(await User.selectAll(conn));
  } catch (err) {
    console.log(err);
  } finally {
    conn?.release();
  }
});

userRouter.get('/id/:id', async (req, res) => {
  let conn: PoolConnection | null = null;
  const { id } = req.params;
  try {
    conn = await db.getPool().getConnection();
    return res.json(await User.selectById(conn, id)); //없으면 바디없음
  } catch (err) {
    console.log(err);
  } finally {
    conn?.release();
  }
});

userRouter.get('/username/:username', async (req, res) => {
  let conn: PoolConnection | null = null;
  const { username } = req.params;
  try {
    conn = await db.getPool().getConnection();
    return res.json(await User.selectByUsername(conn, username)); //없으면 바디없음
  } catch (err) {
    console.log(err);
  } finally {
    conn?.release();
  }
});

userRouter.post('/', async (req, res) => {
  let conn: PoolConnection | null = null;
  const user: UserCreationDto = req.body;
  try {
    conn = await db.getPool().getConnection();
    return res.json(await User.create(conn, user));
  } catch (err) {
    console.log(err);
  } finally {
    conn?.release();
  }
});

userRouter.put('/', async (req, res) => {
  let conn: PoolConnection | null = null;
  const user: UserUpdateDto = req.body;
  try {
    conn = await db.getPool().getConnection();
    const result = await User.update(conn, user);
    console.log(result);
    res.json(result);
  } catch (err) {
    console.log(err);
  } finally {
    conn?.release();
  }
});

userRouter.delete('/id/:id', async (req, res) => {
  let conn: PoolConnection | null = null;
  const { id } = req.params;
  try {
    conn = await db.getPool().getConnection();
    return res.json(await User.softDelete(conn, id));
  } catch (err) {
    console.log(err);
  } finally {
    conn?.release();
  }
});

userRouter.post('/softDeleteRollback/:id', async (req, res) => {
  let conn: PoolConnection | null = null;
  const { id } = req.params;
  try {
    conn = await db.getPool().getConnection();
    return res.json(await User.softDeleteRollback(conn, id));
  } catch (err) {
    console.log(err);
  } finally {
    conn?.release();
  }
});

function jsonFriendlyErrorReplacer(key: any, value: any) {
  if (value instanceof Error) {
    return {
      // Pull all enumerable properties, supporting properties on custom Errors
      ...value,
      // Explicitly pull Error's non-enumerable properties
      name: value.name,
      message: value.message,
      stack: value.stack,
    };
  }

  return value;
}
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof DbConnectionError) {
    res.cookie('error', JSON.stringify(err, jsonFriendlyErrorReplacer));
    return res.redirect(`${REACT_URL}/developmentError`);
  }
  res.status(401);
  res.json({ error: err.message });
};

userRouter.use(errorHandler);

export default userRouter;
