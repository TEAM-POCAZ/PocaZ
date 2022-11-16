import express from 'express';
import { tranSQL } from '../utils/tranSQL';
import { sqlSelectHandler } from '../utils/sqlHandler';
import { IPosts } from '../interface/IPosts';

export default {
  getPosts: async (req: express.Request, res: express.Response) => {
    try {
      const {
        params: { category },
        query: { sortBy, lastPostId, SIZE, userId },
      } = req;

      const postList: IPosts[] = await sqlSelectHandler(
        `${tranSQL.posts.lists}
         ${tranSQL.posts.listsFrom}
          WHERE p.category = ?
          AND p.deleteAt IS NULL
          AND p.id < ?
          ${userId ? `AND p.user =${userId} ` : ''} 
          ORDER BY ${sortBy === 'popular' ? 'LikesCnt DESC, ' : ''} p.id DESC 
          LIMIT ? `,
        [category, lastPostId || Number.MAX_SAFE_INTEGER, SIZE || '10']
      );

      const nextId =
        typeof lastPostId === 'string' &&
        typeof SIZE === 'string' &&
        parseInt(lastPostId) > 0 &&
        postList.length === parseInt(SIZE)
          ? postList[postList.length - 1]?.id - 1
          : null;
      const previousId =
        (lastPostId || Number.MAX_SAFE_INTEGER > 0) && typeof SIZE === 'string'
          ? postList[0]?.id + parseInt(SIZE)
          : null;

      // setTimeout(() => res.json({ postList, nextId, previousId }), 1000)
      res.send({ postList, nextId, previousId });
    } catch (err) {
      throw err;
    }
  },

  getPost: async (req: express.Request, res: express.Response) => {
    const { category, post } = req.params;
    const postDetail = await tranSQL.getOne(
      `${tranSQL.posts.detail}
      FROM Post p INNER JOIN User u ON p.user = u.id
      LEFT JOIN (SELECT id, count(*) as cnt
                    FROM Reply
                  GROUP BY id) rep on p.id = rep.id
     WHERE p.category = ?
       AND p.id = ?
       AND p.deleteAt IS NULL`,
      [post, category, post]
    );
    res.send(postDetail);
  },
  writePost: async (req: any, res: any) => {
    const user = req.user.id;
    const [{ category, title, content }]: [
      { category: number; title: string; content: string }
    ] = req.body;
    const insertId = await tranSQL.postOne(
      `INSERT INTO Post(category, user, title, content)
       VALUES (?)`,
      [[category, user, title, content]]
    );
    // res.send(['33', user])
    res.send([insertId]);
  },
  modifyPost: async (req: any, res: express.Response) => {
    const user = req.user.id;
    const { category, post } = req.params;
    const [{ title, content }]: [
      {
        title: string;
        content: string;
      }
    ] = req.body;

    await tranSQL.putOne(
      `
     UPDATE Post
        SET title = ?,
            content = ?,
            category = ?,
            updateAt = now()
      WHERE id = ?
        AND user = ?`,
      [title, content, category, post, user]
    );
    res.send('successfully updated!');
  },
  deletePost: async (req: express.Request, res: express.Response) => {
    const { category, post, user } = req.params;
    await tranSQL.putOne(
      `UPDATE Post
          SET deleteAt = now()
        WHERE id = ?
          AND user = ?`,
      [post, user]
    );
    res.send('successfully erased!!');
  },
  viewPost: async (req: express.Request, res: express.Response) => {
    const { post } = req.params;
    await tranSQL.putOne(
      `
      UPDATE Post
         SET viewCount = viewCount + 1
       WHERE id = ?`,
      [post]
    );
    res.send('viewcount added');
  },
  searchPost: async (req: express.Request, res: express.Response) => {
    const {
      query: { keyword, lastPostId, SIZE },
    }: { query: any } = req;
    const keywordMap: string = keyword
      .split('.')
      .reduce(
        (result: string, kw: string) =>
          `${result} OR p.title LIKE '%${kw}%' OR p.content LIKE '%${kw}%'`,
        ''
      );
    const postList: IPosts[] = await sqlSelectHandler(
      `
      ${tranSQL.posts.lists}
      ${tranSQL.posts.listsFrom}
      WHERE 1 = 1
      ${
        keyword
          ? `AND (1 != 1
      ${keywordMap})`
          : ''
      }
      AND p.deleteAt IS NULL
      AND p.id < ?
      ORDER BY p.id DESC
      LIMIT ?`,
      [lastPostId || Number.MAX_SAFE_INTEGER, SIZE || '50']
    );

    const nextId =
      typeof lastPostId === 'string' &&
      typeof SIZE === 'string' &&
      parseInt(lastPostId) > 0 &&
      postList.length === parseInt(SIZE)
        ? postList[postList.length - 1]?.id - 1
        : null;
    const previousId =
      (lastPostId || Number.MAX_SAFE_INTEGER > 0) && typeof SIZE === 'string'
        ? postList[0]?.id + parseInt(SIZE)
        : null;
    res.send({ postList, nextId, previousId });
  },
};
