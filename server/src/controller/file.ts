import express from 'express';
import path from 'path';
import { tranSQL } from '../utils/tranSQL';
import multer from 'multer';

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().valueOf() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post('/', upload.array('img', 10), async (req, res) => {
  const files = req.files as Express.Multer.File[];
  if (files?.length === 0) res.send('please send more than one');
  else {
    const fileId: string = await tranSQL.postOne(
      `
      INSERT INTO File (name, path)
      VALUES ?`,
      [
        files.map((file: Express.Multer.File): string[] => [
          file.originalname,
          file.filename,
        ]),
      ]
    );
    res.send(
      ((fileId) => {
        const filesKeys: number[] = [];
        for (let i = 0; i < files.length; i += 1) {
          filesKeys.push(parseInt(fileId) + i);
        }
        return filesKeys;
      })(fileId)
    );
  }
});

router.delete('/:file', async (req, res) => {
  const { file } = req.params;
  tranSQL.putOne(
    `
    DELETE FROM File
     WHERE 1 = 1
       AND id = ?`,
    [file]
  );
});

export default router;
