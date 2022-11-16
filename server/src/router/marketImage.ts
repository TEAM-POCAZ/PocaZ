import express from 'express';
const router = express.Router();
import images from '../controller/marketImage';

/**
 * @swagger
 * components:
 *   schemas:
 *     MarketImage:
 *       type: object
 *       properties:
 *         file:
 *           type: number
 *           example: 1
 *         path:
 *           type: string
 *           example: https://byeolikim.github.io/pocaz-frame/img/18.jpeg
 */

/**
 * @swagger
 * tags:
 * - name: 'marketImage'
 *   description: '장터 게시글 이미지 관리 API'
 */

/**
 * @swagger
 * /api/market/img/{market}:
 *   post:
 *     tags:
 *       - marketImage
 *     summary: 업로드한 이미지 경로를 해당 게시글과 연결합니다.
 *     description: '반드시 이미지 업로드 기록이 File에 남아있어야 연결이 됩니다.'
 *     operationId: linkMarketImage
 *     parameters:
 *       - name: market
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
 *               filesKeys:
 *                 - 1
 *                 - 2
 *     responses:
 *       '200':
 *         description: Successful operation
 */

router.post('/:market', images.writeImages);

/**
 * @swagger
 * /api/market/img/{market}:
 *   get:
 *     tags:
 *       - marketImage
 *     summary: 이미지를 봅니다.
 *     description: ''
 *     operationId: getMarketImg
 *     parameters:
 *       - name: market
 *         in: path
 *         description: id of market
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         example: 1
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MarketImage'
 *       '400':
 *         description: Invalid post
 */

router.get('/:market', images.getImages);

/**
 * @swagger
 * /api/market/img/{market}:
 *   patch:
 *     tags:
 *       - marketImage
 *     summary: 장터 게시글과 이미지 사이의 링크를 제거합니다.
 *     description: ""
 *     operationId: deleteMarketImage
 *     parameters:
 *       - name: market
 *         in: path
 *         description: id of post
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
 *               filesKeys:
 *                 - 1
 *                 - 2
 *     responses:
 *       "400":
 *         description: "Invalid ID supplied"
 *       "404":
 *         description: "image not found"
 */

router.patch('/:market', images.deleteImages);

export default router;
