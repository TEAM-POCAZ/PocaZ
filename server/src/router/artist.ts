import express from 'express';
const router = express.Router();

import agencyRouter from './agency';
import groupRouter from './artistGroup';
import photocardRouter from './photocard';
import galmangRouter from './galmangPoca';
import artists from '../controller/artist';
import { PoolConnection } from 'mysql2/promise';
import db from '../db/database';

router.use('/agency', agencyRouter);
router.use('/group', groupRouter);
router.use('/poca', photocardRouter);
router.use('/galmang', galmangRouter);

/**
 * router artist
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Artist:
 *       type: object
 *       properties:
 *         agency:
 *           type: number
 *           example: 1
 *         artistGroup:
 *           type: string
 *           example: 3
 *         stageName:
 *           type: string
 *           example: 지수
 *         realName:
 *           type: string
 *           example: exponential
 */

/**
 * @swagger
 * tags:
 * - name: 'artist'
 *   description: '아이돌 멤버 개별 관리 API'
 */

/**
 * @swagger
 * /api/artist:
 *   post:
 *     tags:
 *     - artist
 *     summary: 신규 가수 입력
 *     description: "DB에 없는 아이돌 등록"
 *     operationId: writeArtist
 *     requestBody:
 *       description: 수정할 내용을 입력해요
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Artist'
 *     responses:
 *       "200":
 *         description: "successful operation"
 */

router.post('/', artists.writeArtist);

/**
 * @swagger
 * /api/artist:
 *   get:
 *     tags:
 *     - artist
 *     summary: DB상 가수 전체 조회
 *     description: ""
 *     operationId: "getArtists"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Artist'
 */

router.get('/', artists.getArtists);

class Artist {
  static async selectAll(conn: PoolConnection): Promise<any> {
    const [arists] = await conn.query<any>(
      `SELECT a.id, a.artistGroup, a.stageName, a.realName, ag.name as agencyName 
      FROM Artist as a
      INNER JOIN Agency as ag ON a.agency = ag.id
      `
    );
    return arists;
  }
}

router.get('/mypage', async (req, res, next) => {
  let conn: PoolConnection | null = null;
  try {
    conn = await db.getPool().getConnection();
    return res.json(await Artist.selectAll(conn));
  } catch (err) {
    next(err);
  } finally {
    conn?.release();
  }
});

/**
 * @swagger
 * /api/artist/{id}:
 *   get:
 *     tags:
 *     - artist
 *     summary: "멤버 개별 조회"
 *     description: ""
 *     operationId: "getArtist"
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
 *               $ref: '#/components/schemas/Artist'
 */

router.get('/:id', artists.getArtist);

/**
 * @swagger
 * /api/artist/{id}:
 *   put:
 *     tags:
 *     - artist
 *     summary: 아이돌 멤버 정보 수정
 *     description: 아이돌이 세부 정보를 수정
 *     operationId: modifyArtist
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
 *               $ref: '#/components/schemas/Artist'
 *     responses:
 *       "200":
 *         description: "successful operation"
 */

router.put('/:id', artists.modifyArtist);

/**
 * @swagger
 * /api/artist/{id}:
 *   delete:
 *     tags:
 *     - artist
 *     summary: 아이돌 멤버 제거
 *     description: ''
 *     operationId: deleteArtist
 *     parameters:
 *       - name: id
 *         in: path
 *         description: 아이돌 그룹의 key 값
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         example: 18
 *     responses:
 *       '200':
 *         description: successfully erased!
 *       '400':
 *         description: Invalid post
 *       '404':
 *         description: Not Found
 */

router.delete('/:id', artists.deleteArtist);

export default router;
