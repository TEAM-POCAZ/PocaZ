import express from 'express';
import type { ErrorRequestHandler } from 'express';

import replyRouter from './reply';
import likesRouter from './likes';
import postImgRouter from './postImage';
import posts from '../controller/post';
import { checkAuthenticated } from '../middleware/checkAuthenticated';

const router = express.Router();

router.use('/reply', replyRouter);
router.use('/img', postImgRouter);
router.use('/likes', likesRouter);

/**
 * post router
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           example: 1
 *         title:
 *           type: string
 *           example: nljkucta
 *         viewCount:
 *           type: integer
 *           format: int64
 *           example: 0
 *         content:
 *           example: gpmhuyiczphvygcjujgwdbhsbzszulugdfjbrhabzwfu
 *         userId:
 *           type: integer
 *           format: int64
 *           example: 10,
 *         nickname:
 *           example: 임현형
 *         profileImage:
 *           type: string
 *         createAt:
 *           type: string
 *         replyCnt:
 *           type: integer
 *         filePath:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: post
 *   description: 커뮤니티 게시글 관리 API
 *   externalDocs:
 *     description: 커뮤니티 와이어프레임 미리보기
 *     url: https://whimsical.com/main-community-MfzuWWCq96LRMyhvJ1SQSu
 */

/**
 * @swagger
 * /api/post:
 *   post:
 *     tags: [post]
 *     summary: 게시글 하나를 작성합니다.
 *     description: ''
 *     operationId: postPost
 *     requestBody:
 *       description: 수정할 내용을 입력해요
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 category:
 *                   type: string
 *                   example: 1
 *                 user:
 *                   type: string
 *                   example: 10
 *                 title:
 *                   type: string
 *                   example: 제목이에용
 *                 content:
 *                   type: string
 *                   example: 내용이에용
 *     responses:
 *       '200':
 *         description: succusefully posted!
 *       '405':
 *         description: Invalid input
 */

router.post('/', checkAuthenticated, posts.writePost);

/**
 * @swagger
 * /api/post/{category}/{post}:
 *   get:
 *     summary: 게시글 하나를 가져옵니다
 *     operationId: getPost
 *     tags:
 *       - post
 *     parameters:
 *       - name: category
 *         in: path
 *         required: true
 *         description: The category key of posts
 *         schema:
 *           type: string
 *         example: '1'
 *       - name: post
 *         in: path
 *         required: true
 *         description: The key of post
 *         schema:
 *           type: string
 *         example: '1'
 *     description: Update an existing pet by Id
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: category not found
 *       '405':
 *         description: Validation exception
 */

router.get('/:category/:post', posts.getPost);

/**
 * @swagger
 * /api/post/search:
 *   get:
 *     summary: 키워드에 맞는 게시물을 가져옵니다.
 *     operationId: searchPost
 *     tags: [post]
 *     parameters:
 *       - name: keyword
 *         in: query
 *         required: true
 *         description: 게시글 검색 키워드
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
 *     description: none
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: category not found
 *       '405':
 *         description: Validation exception
 */
router.get('/search', posts.searchPost);

/**
 * @swagger
 * /api/post/{category}:
 *   get:
 *     summary: 모든 게시물을 가져옵니다.
 *     operationId: getPosts
 *     tags: [post]
 *     parameters:
 *       - name: category
 *         in: path
 *         required: true
 *         description: The category key of posts
 *         schema:
 *           type: string
 *         example: '1'
 *       - name: sortBy
 *         in: query
 *         required: true
 *         description: input sort keyword - 최신, 인기
 *         schema:
 *           type: string
 *           enum:
 *             - recent
 *             - popular
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
 *     description: Update an existing pet by Id
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: category not found
 *       '405':
 *         description: Validation exception
 */

router.get('/:category/', posts.getPosts);

/**
 * @swagger
 * /api/post/{category}/{post}:
 *   put:
 *     summary: 게시글 하나를 수정합니다.
 *     description: ''
 *     operationId: updatePost
 *     tags:
 *       - post
 *     parameters:
 *       - name: category
 *         in: path
 *         required: true
 *         description: The category key of posts
 *         schema:
 *           type: string
 *         example: 1
 *       - name: post
 *         in: path
 *         required: true
 *         description: The key of post
 *         schema:
 *           type: string
 *         example: 1
 *     requestBody:
 *       description: 수정할 내용을 입력해요
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   example: 제목이에용
 *                 content:
 *                   type: string
 *                   example: 내용이에용
 *     responses:
 *       '405':
 *         description: Invalid input
 */
router.put('/:category/:post', checkAuthenticated, posts.modifyPost);

/**
 * @swagger
 * /api/post/{category}/{post}/{user}:
 *   delete:
 *     summary: 게시글 하나를 제거합니다.
 *     description: ''
 *     operationId: deletePost
 *     tags:
 *       - post
 *     parameters:
 *       - name: category
 *         in: path
 *         required: true
 *         description: The category key of posts
 *         schema:
 *           type: string
 *         example: 1
 *       - name: post
 *         in: path
 *         required: true
 *         description: The key of post
 *         schema:
 *           type: string
 *         example: 11
 *       - name: user
 *         in: path
 *         description: ID of user that need to post
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         example: 10
 *     responses:
 *       '200':
 *         description: successfully erased!
 *       '400':
 *         description: Invalid post
 *       '404':
 *         description: Not Found
 *
 */
router.delete('/:category/:post/:user', posts.deletePost);

/**
 * @swagger
 * /api/post/view/{category}/{post}:
 *   patch:
 *     summary: 게시글 하나의 조회수를 증가시킵니다.
 *     description: ''
 *     operationId: viewPost
 *     tags:
 *       - post
 *     parameters:
 *       - name: category
 *         in: path
 *         required: true
 *         description: The category key of posts
 *         schema:
 *           type: string
 *         example: 1
 *       - name: post
 *         in: path
 *         required: true
 *         description: The key of post
 *         schema:
 *           type: string
 *         example: 11
 *     responses:
 *       '200':
 *         description: viewCount added!
 *       '400':
 *         description: Invalid post
 *       '404':
 *         description: Not Found
 *
 */
router.patch('/view/:category/:post', posts.viewPost);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(401);
  res.json({ error: err.message });
};

router.use(errorHandler);
export default router;
