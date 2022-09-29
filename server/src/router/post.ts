import express from 'express';

import replyRouter from './reply';
import likesRouter from './likes';
import postImgRouter from './postImage';
import posts from '../controller/post';

const router = express.Router();

router.use('/reply', replyRouter);
router.use('/img', postImgRouter);
router.use('/likes', likesRouter);

/**
 * post router
 */

router.post('/', posts.writePost);

router.get('/:category', posts.getPosts);

router.get('/:category/:post', posts.getPost);

router.put('/:category/:post/:user', posts.modifyPost);

router.delete('/:category/:post/:user', posts.deletePost);

export default router;
