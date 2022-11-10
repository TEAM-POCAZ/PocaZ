import express from 'express';

import { createChat, getChat, getSellInfo } from '../controller/chat';

const router = express.Router();

router.get('/:chatRoom', getChat);
router.get('/:chat/?marketdetail=',getSellInfo);
router.post('/', createChat);

export default router;
