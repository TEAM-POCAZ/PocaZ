import express from 'express';
import { tranSQL } from '../utils/tranSQL';
const router = express.Router();

router.get('/:category/:post', async (req, res) => {
  const { post }: { post: string } = req.params;
  const imgList = await tranSQL.getOne(
    `SELECT pi.post, f.path
       FROM
    (SELECT post, file
       FROM PostImage
      WHERE post = ?) pi
       LEFT JOIN File f ON pi.file = f.id;`,
    [post]
  );
  res.send(imgList);
});

router.post('/:category/:post', async (req, res) => {
  const { post }: { post: string } = req.params;
  const { filesKeys } = req.body;
  await tranSQL.postOne(
    `INSERT INTO PostImage (file, post)
     VALUES ?`,
    [filesKeys.map((file: number) => [post, file])]
  );
  res.send('currently developing...');
});

router.delete('/:category/:post', async (req, res) => {
  const { post }: { post: string } = req.params;
  const { filesKeys } = req.body;
  await tranSQL.postOne(
    `DELETE FROM PostImage
      WHERE post = ?
        AND file IN (?)`,
    [post, filesKeys]
  );
  res.send('currently developing...');
});
export default router;
