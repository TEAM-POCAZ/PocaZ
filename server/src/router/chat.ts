import express from 'express';

import { createChat, getChat, getSellItem } from '../controller/chat';

const router = express.Router();

router.get('/:chatRoom', getChat);
router.get('/item/:marketItemId', getSellItem);
router.post('/', createChat);

export default router;
