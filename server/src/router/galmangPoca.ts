import express from 'express';
const router = express.Router();
import galmangs from '../controller/galmangPoca';

/**
 * @swagger
 * components:
 *   schemas:
 *     Galmang:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         user:
 *           type: integer
 *           example: 1
 *         photocard:
 *           type: integer
 *           example: 1
 */

/**
 * @swagger
 * tags:
 * - name: 'galmangPoca'
 *   description: '유저 개인별 갈망포카 관리 API'
 *   externalDocs:
 *     description: '수집하고자 하는 욕망이 강한 개인별 인기 포카'
 *     url: 'https://docs.google.com/spreadsheets/d/1dzhBXaaWtO2csTXuuzKSFeqxQeusko4roApY0ZESK-A/edit#gid=1484967714'
 */

/**
 * @swagger
 * /api/artist/galmang/{user}:
 *   post:
 *     tags:
 *     - galmangPoca
 *     summary: 유저 갈망포카 입력
 *     description: ""
 *     operationId: writeGalmang
 *     parameters:
 *       - name: user
 *         in: path
 *         description: 포토카드의 key 값
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         example: 1
 *     requestBody:
 *       description: 내용을 입력해요
 *       content:
 *         application/json:
 *           schema:
 *             type: integer
 *             example: [1 , 2]
 *     responses:
 *       "200":
 *         description: "successful operation"
 */
router.post('/:user', galmangs.writeGalmang);

/**
 * @swagger
 * /api/artist/galmang/{user}:
 *   get:
 *     tags:
 *     - galmangPoca
 *     summary: 유저 본인의 갈망포카 전체 조회
 *     description: ""
 *     operationId: "getGalmang"
 *     parameters:
 *       - name: user
 *         in: path
 *         description: 포토카드의 key 값
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         example: 1
 *     responses:
 *       "200":
 *         description: "successful operation"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Galmang'
 */

router.get('/:user', galmangs.getGalmang);

/**
 * @swagger
 * /api/artist/galmang/{user}/{id}:
 *   delete:
 *     tags:
 *     - galmangPoca
 *     summary: 유저 갈망포카 제거
 *     description: ''
 *     operationId: deleteGalmang
 *     parameters:
 *       - name: user
 *         in: path
 *         description: 갈망포카 key 값
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         example: 1
 *       - name: id
 *         in: path
 *         description: 갈망포카 key 값
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         example: 2
 *     responses:
 *       '200':
 *         description: successfully erased!
 *       '400':
 *         description: Invalid post
 *       '404':
 *         description: Not Found
 */

router.delete('/:user/:id', galmangs.deleteGalmang);

export default router;
