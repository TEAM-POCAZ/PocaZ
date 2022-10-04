import express from 'express';
const router = express.Router();
import groups from '../controller/artistGroup';

/**
 * @swagger
 * components:
 *   schemas:
 *     ArtistGroup:
 *       type: object
 *       properties:
 *         englishName:
 *           type: string
 *           example: 'BlackPink'
 *         koreanName:
 *           type: string
 *           example: '블랙핑크'
 *         grouplogoUrl:
 *           type: string
 *           example: 'https://www.ygfamily.com/upload/artists/album/9595/32.jpg'
 */

/**
 * @swagger
 * tags:
 * - name: 'artistGroup'
 *   description: '아이돌 그룹 정보 관리 API'
 */

/**
 * @swagger
 * /artist/group:
 *   post:
 *     tags:
 *     - artistGroup
 *     summary: "아이돌 그룹을 입력"
 *     description: "아이돌 소속된 그룹을 입력하세요. (미입력시 멤버 등록 불가)"
 *     operationId: "writeGroup"
 *     requestBody:
 *       description: 수정할 내용을 입력해요
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/ArtistGroup'
 *     responses:
 *       "200":
 *         description: "successful operation"
 */

router.post('/', groups.writeGroup);

/**
 * @swagger
 * /artist/group:
 *   get:
 *     tags:
 *     - artistGroup
 *     summary: "소속사를 전체 조회"
 *     description: ""
 *     operationId: "getGroups"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ArtistGroup'
 */

router.get('/', groups.getGroups);

/**
 * @swagger
 * /artist/group/{id}:
 *   get:
 *     tags:
 *     - artistGroup
 *     summary: "그룹 하나를 조회"
 *     description: ""
 *     operationId: "getGroup"
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
 *                 $ref: '#/components/schemas/ArtistGroup'
 */

router.get('/:id', groups.getGroup);

/**
 * @swagger
 * /artist/group/{id}:
 *   put:
 *     tags:
 *     - artistGroup
 *     summary: 아이돌 그룹 정보 수정
 *     description: "아이돌이 소속된 소속사를 입력하세요. (미입력시 멤버 등록 불가)"
 *     operationId: "modifyGroup"
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
 *       description: 수정할 내용을 입력해요
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/ArtistGroup'
 *     responses:
 *       "200":
 *         description: "successful operation"
 */

router.put('/:id', groups.modifyGroup);

/**
 * @swagger
 * /artist/group/{id}:
 *   delete:
 *     tags:
 *     - artistGroup
 *     summary: 아이돌 그룹 제거
 *     description: ''
 *     operationId: deleteGroup
 *     parameters:
 *       - name: id
 *         in: path
 *         description: 아이돌 그룹의 key 값
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         example: 4
 *     responses:
 *       '200':
 *         description: successfully erased!
 *       '400':
 *         description: Invalid post
 *       '404':
 *         description: Not Found
 */

router.delete('/:id', groups.deleteGroup);

export default router;
