import express from 'express';

import { createChat, getChat, getCheckChatRoom, getSellItem } from '../controller/chat';

const router = express.Router();

router.get('/CheckChatRoom',getCheckChatRoom)
router.get('/item/:marketItemId', getSellItem);
router.get('/:chatRoom', getChat);
router.post('/', createChat);

export default router;
