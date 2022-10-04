import express from 'express';
const router = express.Router();

import markets from '../controller/market';

/**
 * @swagger
 * tags:
 * - name: 'market'
 *   description: 'POCAZ 스토어 관리 API'
 */

router.post('/', markets.writeMarket);
/**
 * @swagger
 * /market:
 *   get:
 *     tags:
 *     - market
 *     summary: "장터 전체 조회"
 *     description: ""
 *     operationId: "getMarkets"
 *     responses:
 *       "200":
 *         description: "successful operation"
 */

router.get('/', markets.getMarkets);

/**
 * @swagger
 * /market/{id}:
 *   get:
 *     tags:
 *     - market
 *     summary: "장터 글 개별 조회"
 *     description: ""
 *     operationId: "getMarket"
 *     parameters:
 *       - name: id
 *         in: path
 *         description: category of post
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         example: 1
 *     responses:
 *       "200":
 *         description: "successful operation"
 */

router.get('/:id', markets.getMarket);

router.put('/:id', markets.modifyMarket);

router.delete('/:id', markets.deleteMarket);

export default router;
