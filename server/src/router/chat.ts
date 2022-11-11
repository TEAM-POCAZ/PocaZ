import express from 'express';

import { createChat, getChat, getCheckChatRoom, getSellItem } from '../controller/chat';

const router = express.Router();

router.get('/:chatRoom', getChat);
router.get('/item/:marketItemId', getSellItem);
router.get('/CheckChatRoom?marketItemId=:marketItemId&userId=:loginUserId',getCheckChatRoom)
router.post('/', createChat);

export default router;
