import express from 'express';

import { searchChatRoom } from '../controller/chatRoom';

const router = express.Router();

router.post('/', searchChatRoom);

export default router;
