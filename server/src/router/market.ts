import express from 'express';

import marketRouter from '../controller/market';
const router = express.Router();

// router.use('/reply', replyRouter);
// router.use('/img', postImgRouter);
// router.use('/likes', likesRouter);
router.use('/', marketRouter);

export default router;
