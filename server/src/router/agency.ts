import express from 'express';
const router = express.Router();
import agencies from '../controller/agency';

/**
 * @swagger
 * components:
 *   schemas:
 *     Agency:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: JYP
 */

/**
 * @swagger
 * tags:
 * - name: 'agency'
 *   description: '소속사(엔터테인먼트) 관리 API(멤버 등록전 필수 입력)'
 */

/**
 * @swagger
 * /artist/agency:
 *   post:
 *     tags:
 *     - agency
 *     summary: "소속사 추가"
 *     description: "아이돌이 소속된 소속사를 입력하세요. (미입력시 해당 소속사 멤버 등록 불가)"
 *     operationId: "uploadAgency"
 *     requestBody:
 *       description: 수정할 내용을 입력해요
 *       content:
 *         application/json:
 *           schema:
 *             type: string
 *             example: ['1','2','3']
 *     responses:
 *       "200":
 *         description: "successful operation"
 */

router.post('/', agencies.writeAgency);

/**
 * @swagger
 * /artist/agency:
 *   get:
 *     tags:
 *     - agency
 *     summary: "소속사 전체 조회"
 *     description: ""
 *     operationId: "getAgencies"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Agency'
 */

router.get('/', agencies.getAgencies);

/**
 * @swagger/artist/agency/{id}:
 *   get:
 *     tags:
 *     - agency
 *     summary: "소속사 하나를 조회"
 *     description: ""
 *     operationId: "getAgency"
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Agency'
 */

router.get('/:id', agencies.getAgency);

/**
 * @swagger/artist/agency/{id}:
 *   put:
 *     tags:
 *     - agency
 *     summary: "소속사를 입력"
 *     description: "아이돌이 소속된 소속사를 입력하세요. (미입력시 멤버 등록 불가)"
 *     operationId: "modifyAgency"
 *     parameters:
 *       - name: id
 *         in: path
 *         description: category of post
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         example: 1
 *     requestBody:
 *       description: 소속사 이름을 수정해요
 *       content:
 *         application/json:
 *           schema:
 *             # type: array
 *             # items:
 *               # type: object
 *               # properties:
 *                 # fileskeys:
 *                 type: string
 *                 example: ['MSG']
 *     responses:
 *       "200":
 *         description: "successful operation"
 */

router.put('/:id', agencies.modifyAgency);

/**
 * @swagger/artist/agency/{id}:
 *   delete:
 *     tags:
 *       - agency
 *     summary: 소속사 하나를 제거합니다.
 *     description: ''
 *     operationId: deleteAgency
 *     parameters:
 *       - name: id
 *         in: path
 *         description: category of post
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         example: 5
 *     responses:
 *       '200':
 *         description: successfully erased!
 *       '400':
 *         description: Invalid post
 *       '404':
 *         description: Not Found
 */

router.delete('/:id', agencies.deleteAgency);

export default router;
