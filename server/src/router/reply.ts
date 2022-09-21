import express from 'express';
const router = express.Router();
import pool from '../controller/db';

let conn: any;
pool.getConnection().then((res) => {
  conn = res;
});

router.get('/:category/:post', async (req, res) => {
  const [oneDepth] = await conn.query(
    `
      SELECT  r.id,             -- reply id
              r.user,           -- user id
              u.nickname,       -- user nickname
              u.profileImage,   -- user profile img
              r.content,        -- reply content
              r.createAt        -- reply created date
        FROM  Reply r
        INNER JOIN USER u ON r.user = u.id
       WHERE  post = ?
         AND  pid IS NULL`,
    [req.params.post]
  );

  const [twoDepth] = await conn.query(
    `
      SELECT	r.id,           -- reply id
              r.pid,          -- parent of reply
              r.user,         -- user id
              u.nickname,     -- user nickname
              u.profileImage, -- user profile img
              r.content,      -- reply content
              r.createAt      -- reply created Date
        FROM  Reply r
       INNER JOIN USER u ON r.user = u.id
       WHERE  post = ?
         AND  pid IS NOT NULL`,
    [req.params.post]
  );
  res.send(
    oneDepth.map((reply: { reply: any; id: any }) => {
      reply.reply = twoDepth.filter((rep: { pid: any }) => rep.pid == reply.id);
      return reply;
    })
  );
});

router.post('/:category/:post', async (req, res) => {
  const { category, post } = req.params;
  const { pid, user, content } = req.body;
  try {
    await conn.beginTransaction();
    conn.query(
      `INSERT INTO Reply (post, pid, user, content)
       VALUES ( ? )`,
      [[parseInt(post), pid, user, content]]
    );
    await conn.commit();
  } catch (err) {
    await conn.rollback();
    conn.release();
    throw err;
  } finally {
    conn.release();
  }
  res.redirect(`/post/${category}/${post}`);
});

router.put('/:category/:post/:reply', async (req, res) => {
  const { category, post, reply: id } = req.params;
  const { user, content } = req.body;
  try {
    await conn.beginTransaction();
    await conn.query(
      `UPDATE Reply
          SET content = ?
        WHERE id = ?
          AND user = ?
          AND post = ?
      `,
      [content, id, user, parseInt(post)]
    );
    conn.commit();
  } catch (err) {
    conn.rollback();
    conn.release();
    throw err;
  } finally {
    conn.release();
  }
  res.redirect(`/post/${category}/${post}`);
});

router.delete('/:category/:post/:reply', async (req, res) => {
  const { category, post, reply: id } = req.params;
  const { user } = req.body;
  try {
    await conn.beginTransaction();
    await conn.query(
      `DELETE FROM Reply
          WHERE id = ?
            AND user = ?
            AND post = ?
        `,
      [id, user, parseInt(post)]
    );
    conn.commit();
  } catch (err) {
    await conn.rollback();
    await conn.release();
    throw err;
  } finally {
    conn.release();
  }
  res.redirect(`/post/${category}/${post}`);
});

export default router;
