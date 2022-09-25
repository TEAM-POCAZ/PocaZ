import express from 'express';

import fileRouter from '../controller/file';
const router = express.Router();

router.use('/', fileRouter);

export default router;
