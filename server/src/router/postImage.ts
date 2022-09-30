import express from 'express';
const router = express.Router();
import images from '../controller/postImage';

router.post('/:category/:post', images.writeImages);

router.get('/:category/:post', images.getImages);

router.delete('/:category/:post', images.deleteImages);

export default router;
