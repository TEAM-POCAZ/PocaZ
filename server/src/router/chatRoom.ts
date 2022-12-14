import express from 'express';

import { getChatRoom } from '../controller/chatRoom';

const router = express.Router();

router.get('/:user', getChatRoom);

export default router;
