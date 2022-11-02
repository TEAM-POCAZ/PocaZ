import { Router } from 'express';
import { PoolConnection } from 'mysql2/promise';
import db from '../db/database';

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
    return res.json(await User.update(conn, user));
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

export default userRouter;
