import express from 'express';
import { tranSQL } from '../utils/tranSQL';
const router = express.Router();
import pool from '../controller/db';
import { RowDataPacket, FieldPacket } from 'mysql2/promise';

interface IReply extends RowDataPacket {
  id: number;
  pid: number | null;
  user: number;
  nickname: string;
  profileImage: string;
  content: string;
  createAt: any;
}
interface IReplyM extends IReply {
  reply: IReply[];
}

router.get('/:category/:post', async (req, res) => {
  const conn = await pool.getConnection();
  console.log('test test');
  const [oneDepth]: [IReplyM[], FieldPacket[]] = await conn.execute(
    `${tranSQL.reply} AND pid IS NULL`,
    [req.params.post]
  );

  const [twoDepth]: [IReply[], FieldPacket[]] = await conn.query(
    `${tranSQL.reply} AND pid IS NOT NULL`,
    [req.params.post]
  );
  res.send(
    oneDepth.map((preply: IReplyM) => {
      preply.reply = twoDepth.filter((rep: IReply) => rep.pid == preply.id);
      return preply;
    })
  );
});

router.get('/:category/:post/:id', async (req, res) => {
  const { post, id } = req.params;
  const reply = await tranSQL.getOne(
    `${tranSQL.reply}
      AND r.post = ?
      AND r.id   = ?`,
    [post, id]
  );
  res.send(reply);
});

router.post('/:category/:post', async (req, res) => {
  const { category, post } = req.params;
  const { pid, user, content } = req.body;
  await tranSQL.postOne(
    `INSERT INTO Reply (post, pid, user, content)
    VALUES ( ? )`,
    [[parseInt(post), pid, user, content]]
  );
  res.redirect(`/post/${category}/${post}`);
});

router.put('/:category/:post/:id', async (req, res) => {
  const { category, post, id } = req.params;
  const { user, content } = req.body;
  await tranSQL.putOne(
    `UPDATE Reply
        SET content = ?
      WHERE id = ?
        AND user = ?
        AND post = ?
    `,
    [content, id, user, parseInt(post)]
  );
  res.redirect(`/post/${category}/${post}`);
});

router.delete('/:category/:post/:id', async (req, res) => {
  const { category, post, id } = req.params;
  const { user } = req.body;

  await tranSQL.putOne(
    `DELETE FROM Reply
      WHERE id   = ?
        AND user = ?
        AND post = ?
    `,
    [id, user, parseInt(post)]
  );
  res.redirect(`/post/${category}/${post}`);
});

export default router;
