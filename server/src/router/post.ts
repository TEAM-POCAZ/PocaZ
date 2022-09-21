import express from 'express';

import postRouter from '../controller/post';

const router = express.Router();
router.use('/', postRouter);

export default router;
