import express from 'express';

import postRouter from '../controller/post';
import replyRouter from '../controller/reply';
import likesRouter from '../controller/likes';
import postImgRouter from '../controller/postImage';

const router = express.Router();

router.use('/reply', replyRouter);
router.use('/img', postImgRouter);
router.use('/likes', likesRouter);
router.use('/', postRouter);

export default router;
