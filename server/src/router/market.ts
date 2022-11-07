import express from 'express';
import { checkAuthenticated } from '../middleware/checkAuthenticated';
const router = express.Router();

import markets from '../controller/market';

/**
 * @swagger
 * tags:
 * - name: 'market'
 *   description: 'POCAZ 스토어 관리 API'
 */

/**
 * @swagger
 * /api/market:
 *   post:
 *     tags:
 *       - market
 *     summary: market
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               - photocard: 1
 *                 user: 1
 *                 title: 포토카드 팝니다
 *                 description: 싱싱한 포토카드 싸게 팝니다.
 *                 price: 10000
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json: {}
 */
router.post('/', checkAuthenticated, markets.writeMarket);
/**
 * @swagger
 * /api/market:
 *   get:
 *     tags:
 *     - market
 *     summary: "장터 전체 조회 with 검색"
 *     description: ""
 *     operationId: "getMarkets"
 *     parameters:
 *       - name: keyword
 *         in: query
 *         description: 장터 게시글 검색 키워드
 *         schema:
 *           type: string
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
 *       - name: group
 *         in: query
 *         description: 그룹의 키값
 *         schema:
 *           type: string
 *         example: '3'
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
 *         description: id of market
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

/**
 * @swagger
 * /api/market/{id}:
 *   put:
 *     tags:
 *       - market
 *     summary: modify market post
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of market
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         example: 1
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               - photocard: 1
 *                 title: 포토카드 팝니다
 *                 description: 싱싱한 포토카드 싸게 팝니다.
 *                 price: 20000
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json: {}
 *   delete:
 *     tags:
 *       - market
 *     summary: delete market post
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of market
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         example: 1
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json: {}
 */
router.put('/:id', markets.modifyMarket);

router.delete('/:id', markets.deleteMarket);

export default router;
