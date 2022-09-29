import express from 'express';
const router = express.Router();

import { upload, uploadFiles, deleteFiles } from '../controller/file';

router.post('/', upload.array('img', 10), uploadFiles);

router.delete('/:file', deleteFiles);

export default router;
