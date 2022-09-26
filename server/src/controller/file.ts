import express from 'express';
import { tranSQL } from '../utils/tranSQL';
const router = express.Router();

import multer from 'multer';
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  //   filename: (req, file, callback) => {
  //     callback(null, file.originalname);
  //   },
});

const upload = multer({ storage: storage });

router.post('/', upload.array('img', 10), async (req, res) => {
  //   if (req.files === undefined) res.send('');
  // const files = req.files?.map((file: Express.Multer.File) => [
  //   file.originalname,
  //   file.filename,
  // ]);
  // tranSQL.putOne(
  //   `
  //   INSERT INTO File (filename, filepath)
  //   VALUES ?`,
  //   files
  // );
});

router.delete('/:file', async (req, res) => {
  const { file } = req.params;
  tranSQL.putOne(
    `
    DELETE FROM File
     WHERE 1 = 1
       AND post = ?
       AND user = ?`,
    [file]
  );
});

export default router;
