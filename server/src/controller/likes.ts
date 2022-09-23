import express from 'express';
import { tranSQL } from '../utils/tranSQL';
const router = express.Router();

router.post('/:post/:user', async (req, res) => {
  const { post, user } = req.params;
  tranSQL.putOne(
    `
    INSERT INTO LikeManage (post, user)
    VALUES ( ? , ? )`,
    [post, user]
  );
});

router.delete('/:post/:user', async (req, res) => {
  const { post, user } = req.params;
  tranSQL.putOne(
    `
    DELETE FROM LikeManage
     WHERE 1 = 1
       AND post = ?
       AND user = ?`,
    [post, user]
  );
});

export default router;
