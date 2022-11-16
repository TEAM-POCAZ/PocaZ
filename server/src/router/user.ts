import { Router } from 'express';
import { PoolConnection } from 'mysql2/promise';
import db from '../db/database';
import type { ErrorRequestHandler } from 'express';
import { DbConnectionError } from '../error/DbConnectionError';
import { multerUpload, uploadFiles } from '../middleware/multer';
import { config } from '../config';
import { tranSQL } from '../utils/tranSQL';
import { User, UserCreationDto, UserUpdateDto } from '../entity/user';
const REACT_URL: string = config.host.reactAppHostUrl;
const HOST_URL: string = config.host.url;
const userRouter = Router();

userRouter.get('/', async (req, res, next) => {
  let conn: PoolConnection | null = null;
  try {
    conn = await db.getPool().getConnection();
    return res.json(await User.selectAll(conn));
  } catch (err) {
    next(err);
  } finally {
    conn?.release();
  }
});

userRouter.get('/id/:id', async (req, res, next) => {
  let conn: PoolConnection | null = null;
  const { id } = req.params;
  try {
    conn = await db.getPool().getConnection();
    return res.json(await User.selectById(conn, id)); //없으면 바디없음
  } catch (err) {
    next(err);
  } finally {
    conn?.release();
  }
});

userRouter.get('/username/:username', async (req, res, next) => {
  let conn: PoolConnection | null = null;
  const { username } = req.params;
  try {
    conn = await db.getPool().getConnection();
    return res.json(await User.selectByUsername(conn, username)); //없으면 바디없음
  } catch (err) {
    next(err);
  } finally {
    conn?.release();
  }
});

userRouter.post('/', async (req, res, next) => {
  let conn: PoolConnection | null = null;
  const user: UserCreationDto = req.body;
  try {
    conn = await db.getPool().getConnection();
    return res.json(await User.create(conn, user));
  } catch (err) {
    next(err);
  } finally {
    conn?.release();
  }
});

userRouter.put('/', multerUpload.single('photo'), async (req, res, next) => {
  let conn: PoolConnection | null = null;
  const user: UserUpdateDto = req.body;
  try {
    const file = req.file as Express.Multer.File;
    if (!!file) {
      const fileId: string = await tranSQL.postOne(
        `
      INSERT INTO File (name, path) 
      VALUES (?, ?)`,
        [file.originalname, file.filename]
      );
      user.profileImage = `${HOST_URL}/api/${file.filename}`;
    }
    conn = await db.getPool().getConnection();
    return res.json(await User.update(conn, user));
  } catch (err) {
    next(err);
  } finally {
    conn?.release();
  }
});

userRouter.post('/softDeleteRollback/:id', async (req, res, next) => {
  let conn: PoolConnection | null = null;
  const { id } = req.params;
  try {
    conn = await db.getPool().getConnection();
    return res.json(await User.softDeleteRollback(conn, id));
  } catch (err) {
    next(err);
  } finally {
    conn?.release();
  }
});

userRouter.delete('/id/:id', async (req, res, next) => {
  let conn: PoolConnection | null = null;
  const { id } = req.params;
  try {
    conn = await db.getPool().getConnection();
    return res.json(await User.softDelete(conn, id));
  } catch (err) {
    next(err);
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
  console.log(err);
  if (err instanceof DbConnectionError) {
    res.cookie('error', JSON.stringify(err, jsonFriendlyErrorReplacer));
    return res.redirect(`${REACT_URL}/developmentError`);
  }
  res.status(401);
  res.json({ error: err.message });
};

userRouter.use(errorHandler);
export default userRouter;
