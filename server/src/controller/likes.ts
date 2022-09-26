import express from 'express';
import { tranSQL } from '../utils/tranSQL';
const router = express.Router();

router.get('/:user', async (req, res) => {
  const { user }: { user: string } = req.params;

  res.send(
    await tranSQL.getOne(
      `SELECT IFNULL(count(*),0) cnt
       FROM LikeManage
      WHERE 1 = 1
       ${tranSQL.where('user')}`,
      [user]
    )
  );
});

router.get('/:post/:user', async (req, res) => {
  const { post, user }: { post: string; user: string } = req.params;

  res.send(
    await tranSQL.getOne(
      `SELECT post, IFNULL(count(user),0) cnt
       FROM LikeManage
      WHERE 1 = 1
      ${tranSQL.where('post')}
       ${tranSQL.where('user')} 
      GROUP BY post`,
      [post, user]
    )
  );
});

router.post('/:post/:user', async (req, res) => {
  const { post, user } = req.params;
  res.send(
    await tranSQL.putOne(
      `
      INSERT IGNORE INTO LikeManage (post, user)
      VALUES ( ? , ? )`,
      [post, user]
    )
  );
});

router.delete('/:post/:user', async (req, res) => {
  const { post, user } = req.params;
  res.send(
    await tranSQL.putOne(
      `
    DELETE IGNORE FROM LikeManage
     WHERE 1 = 1
       AND post = ?
       AND user = ?`,
      [post, user]
    )
  );
});

export default router;
