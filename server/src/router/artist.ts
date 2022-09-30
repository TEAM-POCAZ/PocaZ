import express from 'express';
const router = express.Router();

import agencyRouter from './agency';
import groupRouter from './artistGroup';
import photocardRouter from './photocard';
import galmangRouter from './galmangPoca';
import artists from '../controller/artist';

router.use('/agency', agencyRouter);
router.use('/group', groupRouter);
router.use('/poca', photocardRouter);
router.use('/galmang', galmangRouter);

/**
 * router artist
 */
router.post('/', artists.writeArtist);

router.get('/', artists.getArtists);

router.get('/:id', artists.getArtist);

router.put('/:id', artists.modifyArtist);

router.delete('/:id', artists.deleteArtist);

export default router;
