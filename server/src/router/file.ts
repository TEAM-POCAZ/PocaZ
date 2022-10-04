import express from 'express';
const router = express.Router();

import { multerUpload, uploadFiles } from '../middleware/multer';

/**
 * @swagger
 *
 * /file:
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

export default router;
