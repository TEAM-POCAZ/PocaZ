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
 * /api/market:
 *   get:
 *     tags:
 *     - market
 *     summary: "장터 전체 조회"
 *     description: ""
 *     operationId: "getMarkets"
 *     parameters:
 *       - name: lastPostId
 *         in: query
 *         description: 페이지의 마지막 글의 id를 얻습니다. 공백으로 둘 경우 최신 get id of Last post of Page
 *         schema:
 *           type: string
 *       - name: SIZE
 *         in: query
 *         description: 현재 페이지에서 추가로 불러올 게시글의 수. get number of Pages want to get
 *         schema:
 *           type: string
 *         example: '30'
 * 
 *     responses:
 *       "200":
 *         description: "successful operation"
 */

router.get('/', markets.getMarkets);

/**
 * @swagger
 * /api/market/{id}:
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
