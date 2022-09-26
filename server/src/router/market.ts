import express from 'express';

import marketRouter from '../controller/market';
const router = express.Router();

router.use('/', marketRouter);

export default router;
