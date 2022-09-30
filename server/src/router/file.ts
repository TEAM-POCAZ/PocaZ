import express from 'express';
const router = express.Router();

import { multerUpload, uploadFiles } from '../middleware/multer';

router.post('/', multerUpload.array('img', 10), uploadFiles);

export default router;
