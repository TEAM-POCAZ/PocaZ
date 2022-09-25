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

router.post('/:category/:post', async (req, res) => {
  const { post } = req.params;
  const [filesKeys]: [number[]] = req.body;
  await tranSQL.postOne(
    `INSERT INTO PostImage (file, post)
     VALUES ?`,
    [
      ((num: number) => {
        const postFile = [];
        const postId = parseInt(post);
        for (let i = 0; i < num; i += 1) {
          postFile.push([postId, filesKeys[i]]);
        }
      })(filesKeys.length),
    ]
  );
  res.send('currently developing...');
});

// router.delete('/:category/:post', async (req, res) => {
//   const { post } = req.params;
//   const [filesKeys]: [number[]] = req.body;
//   await tranSQL.postOne(
//     `DELETE FROM PostImage
//       WHERE post = ?
//         AND file IN ?`,
//     [
//       post,
//       ((num: number) => {
//         const postFile = [];
//         for (let i = 0; i < num; i += 1) {
//           postFile.push([filesKeys[i]]);
//         }
//       })(filesKeys.length),
//     ]
//   );
//   res.send('currently developing...');
// });
// export default router;
