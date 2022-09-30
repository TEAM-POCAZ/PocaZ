import express from 'express';
const router = express.Router();
import replys from '../controller/reply';

router.get('/:category/:post', replys.getReplys);

router.get('/:id', replys.getReply);

router.post('/:category/:post/:user', replys.writeReply);

router.put('/:category/:post/:user/:id', replys.modifyReply);

router.delete('/:category/:post/:user/:id', replys.deleteReply);

export default router;
