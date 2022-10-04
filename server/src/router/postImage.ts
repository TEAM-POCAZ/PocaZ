import express from 'express';
const router = express.Router();
import images from '../controller/postImage';

/**
 * @swagger
 * components:
 *   schemas:
 *     PostImage:
 *       type: object
 *       properties:
 *         post:
 *           type: string
 *           example: 1
 *         path:
 *           type: string
 *           example: https://byeolikim.github.io/pocaz-frame/img/18.jpeg
 */

/**
 * @swagger
 * tags:
 * - name: 'postImage'
 *   description: '커뮤니티 게시글 이미지 관리 API'
 */

/**
 * @swagger
 * /post/img/{category}/{post}:
 *   post:
 *     tags:
 *       - postImage
 *     summary: 업로드한 이미지 경로를 해당 게시글과 연결합니다.
 *     description: '반드시 이미지 업로드 기록이 File에 남아있어야 연결이 됩니다.'
 *     operationId: linkPostImage
 *     parameters:
 *       - name: category
 *         in: path
 *         description: category of post
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         example: 1
 *       - name: post
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
 *       '200':
 *         description: Successful operation
 */

router.post('/:category/:post', images.writeImages);

/**
 * @swagger
 * /post/img/{category}/{post}:
 *   get:
 *     tags:
 *       - postImage
 *     summary: 이미지를 봅니다.
 *     description: ''
 *     operationId: getPostImg
 *     parameters:
 *       - name: category
 *         in: path
 *         description: category of post
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         example: 1
 *       - name: post
 *         in: path
 *         description: id of post
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
 *                 $ref: '#/components/schemas/PostImage'
 *       '400':
 *         description: Invalid post
 */

router.get('/:category/:post', images.getImages);

/**
 * @swagger
 * /post/img/{category}/{post}:
 *   patch:
 *     tags:
 *       - postImage
 *     summary: 게시글과 이미지 사이의 링크를 제거합니다.
 *     description: ""
 *     operationId: deletePostImage
 *     parameters:
 *       - name: category
 *         in: path
 *         description: category of post
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         example: 1
 *       - name: post
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

router.patch('/:category/:post', images.deleteImages);

export default router;
