import express from 'express';
import {RowDataPacket} from 'mysql2'
import { tranSQL } from '../utils/tranSQL';
import { sqlSelectHandler } from '../utils/sqlHandler';
interface IPosts extends RowDataPacket {
  id: number,
  title: string,
  viewCount: number,
  content: string,
  userId: number,
  nickname: string,
  profileImage: string,
  createAt: string,
  replyCnt: number,
  LikesCnt: number,
  filePath: string
}

export default {
  getPosts: async (req: express.Request, res: express.Response) => {
    try{
      const {
        params: { category },
        query: { sortBy, lastPostId, SIZE },
      } = req;
      
      const postList: IPosts[] = await sqlSelectHandler(
        `${tranSQL.posts.lists}
         ${tranSQL.posts.listsFrom}
          WHERE p.category = ?
          AND p.deleteAt IS NULL
          AND p.id < ?
          ORDER BY ${
            sortBy === 'popular' ? 'LikesCnt DESC, ' : ''
          } p.id DESC 
          LIMIT ?`,
        [category,
        //  lastPostId === '0' ? Number.MAX_SAFE_INTEGER : lastPostId,
         lastPostId,
         typeof SIZE === 'string' ? parseInt(SIZE) : 50]
      );
      
      const nextId = typeof lastPostId === 'string' && typeof SIZE === 'string' && 
                     parseInt(lastPostId) > 0 && postList.length === parseInt(SIZE)
      ? postList[postList.length - 1]?.id - 1
      : null;
      const previousId = (lastPostId || Number.MAX_SAFE_INTEGER > 0) && typeof SIZE === 'string'
            ? postList[0].id + parseInt(SIZE) : null;
      
      // setTimeout(() => res.json({ postList, nextId, previousId }), 1000)
      res.send({ postList, nextId, previousId })
    } catch(err){
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
  writePost: async (req: express.Request, res: express.Response) => {
    const [{ category, user, title, content }]: [
      { category: number; user: number; title: string; content: string }
    ] = req.body;
    const insertId = await tranSQL.postOne(
      `INSERT INTO Post(category, user, title, content)
       VALUES (?)`,
      [[category, user, title, content]]
    );
    res.send([insertId]);
  },
  modifyPost: async (req: express.Request, res: express.Response) => {
    const { category, post, user } = req.params;
    const [{ title, content }]: [
      {
        title: string;
        content: string;
        // user: string;
      }
    ] = req.body;

    await tranSQL.putOne(
      `
     UPDATE Post
        SET title = ?,
            content = ?,
            updateAt = now()
      WHERE id = ?
        AND user = ?`,
      [title, content, post, user]
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
      query: { keyword },
    }: { query: any } = req;
    const keywordMap: string = keyword
      .split('.')
      .reduce(
        (result: string, kw: string) =>
          `${result} OR p.title LIKE '%${kw}%' OR p.content LIKE '%${kw}%'`,
        ''
      );
    res.send(
      await tranSQL.getOne(`
      ${tranSQL.posts.lists}
      ${tranSQL.posts.listsFrom}
      WHERE (1 != 1
      ${keywordMap})
      AND p.deleteAt IS NULL
      ORDER BY p.id DESC`)
    );
  },
};
