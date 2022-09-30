import express from 'express';
const router = express.Router();
import likes from '../controller/likes';

router.get('/:user', likes.totalLikes);

router.get('/:post/:user', likes.getPostLikes);

router.post('/:post/:user', likes.writeLikes);

router.delete('/:post/:user', likes.deleteLikes);

export default router;
