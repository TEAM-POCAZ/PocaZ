import express from 'express';
const router = express.Router();
import photocards from '../controller/photocard';

router.post('/', photocards.writePhotocard);

router.get('/', photocards.getPhotocards);

router.get('/:id', photocards.getPhotocard);

router.put('/:id', photocards.modifyPhotocard);

router.delete('/:id', photocards.deletePhotocard);

export default router;
