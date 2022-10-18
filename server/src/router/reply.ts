import express from 'express';
const router = express.Router();
import replys from '../controller/reply';

/**
 * @swagger
 * components:
 *  schemas:
 *    Reply:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          format: int64
 *          example: 1
 *        pid:
 *          type: integer
 *          format: int64
 *          example: 1
 *        user:
 *          type: integer
 *          format: int64
 *          example: 1
 *        nickname:
 *          type: string
 *          example: 엄준식
 *        content:
 *          type: string
 *          example: gpmhuyiczphvygcjujgwdbhsbzszulugdfjbrhabzwfu
 *        createAt:
 *          type: string
 *          example: 2022-09-28T04:32:58.000Z
 *    ReplyM:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          format: int64
 *          example: 1
 *        pid:
 *          type: integer
 *          format: int64
 *          example: 1
 *        user:
 *          type: integer
 *          format: int64
 *        nickname:
 *          type: string
 *          example: 엄준식
 *        content:
 *          type: string
 *          example: gpmhuyiczphvygcjujgwdbhsbzszulugdfjbrhabzwfu
 *        createAt:
 *          type: string
 *          example: 2022-09-28T04:32:58.000Z
 *        reply:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Reply'
 */

/**
 * @swagger
 * tags:
 * - name: reply
 *   description: '커뮤니티 게시글 댓글 관리 API'
 */

/**
 * @swagger
 * /api/post/reply/{category}/{post}:
 *   get:
 *     tags:
 *       - reply
 *     summary: 게시글의 모든 댓글을 조회합니다.
 *     description: ''
 *     operationId: getReplys
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
 *               $ref: '#/components/schemas/ReplyM'
 *       '400':
 *         description: Invalid post
 */
router.get('/:category/:post', replys.getReplys);

/**
 * @swagger
 * /api/post/reply/{id}:
 *   get:
 *     tags:
 *       - reply
 *     summary: 댓글 하나를 조회합니다.
 *     description: ''
 *     operationId: getReply
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of reply
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
 *               $ref: '#/components/schemas/Reply'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/Reply'
 *       '400':
 *         description: Invalid post
 */

router.get('/:id', replys.getReply);

/**
 * @swagger
 * /api/post/reply/{category}/{post}/{user}:
 *   post:
 *     tags:
 *       - reply
 *     summary: 덧글 하나를 작성합니다.
 *     description: ''
 *     operationId: postReply
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
 *         example: 9
 *       - name: user
 *         in: path
 *         description: id of user
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         example: 10
 *     requestBody:
 *       description: 입력할 내용을 입력해요
 *       content:
 *         application/json:
 *           schema:
 *             # type: array
 *             # items:
 *             type: object
 *             properties:
 *               pid:
 *                 type: number
 *                 example: null
 *               content:
 *                 type: string
 *                 example: 댓글글 내용이에용
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reply'
 *           application/xml:
 *             schema:
 *               $ref: '#/components/schemas/Reply'
 *       default:
 *         description: successful operation
 */

router.post('/:category/:post/:user', replys.writeReply);

/**
 * @swagger
 * /api/post/reply/{category}/{post}/{user}/{id}:
 *   put:
 *     tags:
 *       - reply
 *     summary: 댓글을 수정합니다.
 *     description: This can only be done by the logged in user.
 *     operationId: updateReply
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
 *         example: 9
 *       - name: user
 *         in: path
 *         description: id of user
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         example: 10
 *       - name: id
 *         in: path
 *         description: id of reply
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         example: 1
 *     requestBody:
 *       description: Update an existent user in the store
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: string cheese
 *     responses:
 *       default:
 *         description: successful operation
 */

router.put('/:category/:post/:user/:id', replys.modifyReply);

/**
 * @swagger
 * /api/post/reply/{category}/{post}/{user}/{id}:
 *   delete:
 *     tags:
 *       - reply
 *     summary: 댓글을 삭제합니다.
 *     description: This can only be done by the logged in user.
 *     operationId: deleteReply
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
 *         example: 9
 *       - name: user
 *         in: path
 *         description: id of reply
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         example: 10
 *       - name: id
 *         in: path
 *         description: id of reply
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         example: 1
 *     responses:
 *       '400':
 *         description: Invalid username supplied
 *       '404':
 *         description: User not found
 */

router.delete('/:category/:post/:user/:id', replys.deleteReply);

export default router;
