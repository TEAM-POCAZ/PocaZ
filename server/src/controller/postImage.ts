import express from 'express';
import { tranSQL } from '../utils/tranSQL';
const router = express.Router();

router.get('/:category/:post', async (req, res) => {
  const { post } = req.params;
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

router.post('/:category/:post', (req, res) => {
  res.send('currently developing...');
});
router.put('/:category/:post', (req, res) => {
  res.send('currently developing...');
});
router.delete('/:category/:post', (req, res) => {
  res.send('currently developing...');
});
export default router;
