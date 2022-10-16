import express from 'express';
import { tranSQL } from '../utils/tranSQL';

export default {
  getPosts: async (req: express.Request, res: express.Response) => {
    const {
      params: { category },
      query: { sortBy },
    } = req;
    const postList = await tranSQL.getOne(
      `${tranSQL.posts.lists}
       ${tranSQL.posts.listsFrom}
        WHERE p.category = ?
        AND p.deleteAt IS NULL
        ORDER BY ${sortBy === 'boast' ? 'LikesCnt DESC, ' : ''} p.createAt DESC 
        LIMIT ?`,
      [category, 100]
    );
    res.send(postList);
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
    } = req;
    await tranSQL.getOne(`
    ${tranSQL.posts.lists}
    ${tranSQL.posts.listsFrom}
    WHERE p.category = ?
      AND p.deleteAt IS NULL
    ORDER BY p.createAt DESC`);
  },
};
