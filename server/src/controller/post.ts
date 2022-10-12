import express from 'express';
import { tranSQL } from '../utils/tranSQL';

export default {
  getPosts: async (req: express.Request, res: express.Response) => {
    const postList = await tranSQL.getOne(
      `SELECT p.id			            AS id,		  	-- post id
            p.title				          AS title, 		-- post title
            IFNULL(p.viewCount,0)   AS viewCount,	-- post view count
            p.content		  	        AS content,		-- post text
            u.id			  	          AS userId,		-- user key
            u.nickname			        AS nickname,	-- user nickname
            u.profileImage	        AS profileImage,-- user profile image
            p.createAt			        AS createAt,	-- post create Date
            IFNULL(rep.cnt,0)  	    AS replyCnt,	-- post reply cnt
            img.path	  		        AS filePath		-- post main img src
            FROM Post p
            INNER JOIN User u ON p.user = u.id
        LEFT JOIN (SELECT id, count(*) as cnt
                    FROM Reply
                    GROUP BY id) rep on p.id = rep.id
        LEFT JOIN (SELECT pi.post  as post,
                        f.path   as path
                    FROM (SELECT post, min(file) as main
                            FROM PostImage
                            GROUP BY post) pi
                    LEFT JOIN File f ON pi.main = f.id
                    ) img on p.id = img.post
        WHERE p.category = ?
        AND p.deleteAt IS NULL
        LIMIT ?`,
      [req.params.category, 100]
    );
    res.send(postList);
  },

  getPost: async (req: express.Request, res: express.Response) => {
    const { category, post } = req.params;
    const postDetail = await tranSQL.getOne(
      `SELECT	p.title		  		      AS title,		  -- post title
            IFNULL(p.viewCount,0) 	AS viewCount,	-- post view count
            p.content	   			      AS text,	    -- post text
            u.id      			        AS userId,		-- user key
            u.nickname		          AS nickname,	-- user nickname
            u.profileImage          AS profileImage,-- user profile image
            IFNULL((SELECT count(*) cnt
               FROM LikeManage
              WHERE post = ?), 0) AS likesCnt     -- post like cnt
      FROM Post p
     INNER JOIN User u ON p.user = u.id
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
    const { category, post } = req.params;
    const [{ title, content, user }]: [
      {
        title: string;
        content: string;
        user: string;
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
    console.log(post);
    await tranSQL.putOne(
      `
      UPDATE Post
         SET viewCount = viewCount + 1
       WHERE id = ?`,
      [post]
    );
    res.send('viewcount added');
  },
};
