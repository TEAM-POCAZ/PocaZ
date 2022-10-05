import express from 'express';
const router = express.Router();
import photocards from '../controller/photocard';

/**
 * @swagger
 * components:
 *   schemas:
 *     Photocard:
 *       type: object
 *       properties:
 *         artist:
 *           type: integer
 *           example: 1
 *         path:
 *           type: string
 *           example: 'https://www.naver.com'
 *         name:
 *           type: string
 *           example: '포카칩'
 *         description:
 *           type: string
 *           example: '좋은 포카입니다.'
 */

/**
 * @swagger
 * tags:
 * - name: 'photocard'
 *   description: '포토카드 개별 관리 API'
 */

/**
 * @swagger
 * /api/artist/poca:
 *   post:
 *     tags:
 *     - photocard
 *     summary: 신규 포토카드 입력
 *     description: "DB에 없는 포토카드 등록"
 *     operationId: writePhotocard
 *     requestBody:
 *       description: 수정할 내용을 입력해요
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Photocard'
 *     responses:
 *       "200":
 *         description: "successful operation"
 */
router.post('/', photocards.writePhotocard);
/**
 * @swagger
 * /api/artist/poca:
 *   get:
 *     tags:
 *     - photocard
 *     summary: DB상 포토카드 전체 조회
 *     description: ""
 *     operationId: getPhotocards
 *     responses:
 *       "200":
 *         description: "successful operation"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Photocard'
 */
router.get('/', photocards.getPhotocards);

/**
 * @swagger
 * /api/artist/poca/{id}:
 *   get:
 *     tags:
 *     - photocard
 *     summary: "포토카드 개별 조회"
 *     description: ""
 *     operationId: getPhotocard
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
 *                 $ref: '#/components/schemas/Photocard'
 */
router.get('/:id', photocards.getPhotocard);

/**
 * @swagger
 * /api/artist/poca/{id}:
 *   put:
 *     tags:
 *     - photocard
 *     summary: 포토카드 정보 수정
 *     description: ''
 *     operationId: modifyPhotocard
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id of photocard
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
 *               $ref: '#/components/schemas/Photocard'
 *     responses:
 *       "200":
 *         description: "successful operation"
 */

router.put('/:id', photocards.modifyPhotocard);

/**
 * @swagger
 * /api/artist/poca/{id}:
 *   delete:
 *     tags:
 *     - photocard
 *     summary: 포토카드 제거( DB 수정 전까지는 사용하지 말것)
 *     description: ''
 *     operationId: deletePhotocard
 *     parameters:
 *       - name: id
 *         in: path
 *         description: 포토카드의 key 값
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         example: 1
 *     responses:
 *       '200':
 *         description: successfully erased!
 *       '400':
 *         description: Invalid post
 *       '404':
 *         description: Not Found
 */

router.delete('/:id', photocards.deletePhotocard);

export default router;
