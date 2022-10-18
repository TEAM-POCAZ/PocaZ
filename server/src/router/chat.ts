import express from 'express';

import { createChat, getChat } from '../controller/chat';

const router = express.Router();

router.get('/:chatRoom', getChat);
router.post('/', createChat);

export default router;
