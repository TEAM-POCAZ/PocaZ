import express from 'express';
const router = express.Router();

import markets from '../controller/market';

router.post('/', markets.writeMarket);

router.get('/', markets.getMarkets);

router.get('/:id', markets.getMarket);

router.put('/:id', markets.modifyMarket);

router.delete('/:id', markets.deleteMarket);

export default router;
