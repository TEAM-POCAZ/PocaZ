import express from 'express';
const router = express.Router();
import likes from '../controller/likes';

/**
 * @swagger
 * components:
 *   schemas:
 *     Likes:
 *       type: object
 *       properties:
 *         post:
 *           type: integer
 *           example: 1
 *         user:
 *           type: integer
 *           example: 1
 */

/**
 * @swagger
 * tags:
 * - name: likes
 *   description: 유저와 게시글 좋아요 관리 API
 */

/**
 * @swagger
 * /post/likes/{user}:
 *   get:
 *     tags:
 *       - likes
 *     summary: 유저가 누른 좋아요 합계를 조회합니다.
 *     description: This can only be done by the logged in user.
 *     operationId: totalLikes
 *     parameters:
 *       - name: user
 *         in: path
 *         description: id of user
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
 *               $ref: '#/components/schemas/Likes'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/Likes'
 *       '400':
 *         description: Invalid post
 */

router.get('/:user', likes.totalLikes);

/**
 * @swagger
 * /post/likes/{post}/{user}:
 *   get:
 *     tags:
 *       - likes
 *     summary: 유저의 게시글 단위 좋아요 갯수 조회
 *     description: ''
 *     operationId: getPostLikes
 *     parameters:
 *       - name: post
 *         in: path
 *         description: category of post
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         example: 1
 *       - name: user
 *         in: path
 *         description: category of post
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
 *               $ref: '#/components/schemas/Likes'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/Likes'
 *       '400':
 *         description: Invalid post
 */

router.get('/:post/:user', likes.getPostLikes);

/**
 * @swagger
 * /post/likes/{post}/{user}:
 *   post:
 *     tags:
 *       - likes
 *     summary: 좋아요~
 *     description: ''
 *     operationId: writeLikes
 *     parameters:
 *       - name: post
 *         in: path
 *         description: category of post
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         example: 1
 *       - name: user
 *         in: path
 *         description: category of post
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         example: 1
 *     responses:
 *       '200':
 *         description: successful operation
 */

router.post('/:post/:user', likes.writeLikes);

/**
 * @swagger
 * /post/likes/{post}/{user}:
 *   delete:
 *     tags:
 *       - likes
 *     summary: 좋아요 취소
 *     description: ''
 *     operationId: deleteLikes
 *     parameters:
 *       - name: post
 *         in: path
 *         description: category of post
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         example: 1
 *       - name: user
 *         in: path
 *         description: category of post
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         example: 1
 *     responses:
 *       '200':
 *         description: successful operation
 */

router.delete('/:post/:user', likes.deleteLikes);

export default router;
