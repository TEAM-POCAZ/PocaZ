import express from 'express';
import { tranSQL } from '../utils/tranSQL';
const router = express.Router();

import { multerUpload, uploadFiles } from '../middleware/multer';

/**
 * @swagger
 *
 * /api/file:
 *   post:
 *     tags:
 *       - file
 *     summary: file
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               img:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json: {}
 *       "500":
 *         description: unexpected field!
 */

router.post('/', multerUpload.array('img', 10), uploadFiles);

/**
 * @swagger
 *
 * /api/file/{fileId}:
 *   get:
 *     tags:
 *       - file
 *     summary: get one file
 *     parameters:
 *       - name: fileId
 *         in: path
 *         description: key of file
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         example: 1
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json: {}
 *       "500":
 *         description: unexpected field!
 */

router.get('/:fileId', async (req, res) => {
  const { fileId } = req.params;
  // console.log(req.params);
  // const path = );
  res.send(
    await tranSQL.getOne(`SELECT path FROM File WHERE id = ?`, [fileId])
  );
});

export default router;
