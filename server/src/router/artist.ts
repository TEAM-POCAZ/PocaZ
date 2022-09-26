import express from 'express';

import agencyRouter from '../controller/agency';
import groupRouter from '../controller/artistGroup';
import artistRouter from '../controller/artist';
import photocardRouter from '../controller/photocard';
import galmangRouter from '../controller/galmangPoca';

const router = express.Router();

router.use('/agency', agencyRouter);
router.use('/group', groupRouter);
router.use('/poca', photocardRouter);
router.use('/galmang', galmangRouter);
router.use('/', artistRouter);

export default router;
