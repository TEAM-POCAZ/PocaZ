import express from 'express';
import { tranSQL } from '../utils/tranSQL';
const router = express.Router();

router.post('/:post', async (req, res) => {
  const { post } = req.params;
  //   const { user } = req.body;
  tranSQL.putOne(
    `
    INSERT INTO PostImage (file, post)
    VALUES ( ? , ? )`,
    // req.files?.map((file: Express.Multer.File) => [file.filename, post])
    ['1', 1]
  );
});

export default router;
