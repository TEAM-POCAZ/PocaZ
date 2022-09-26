import express from 'express';
const router = express.Router();
import { tranSQL } from '../utils/tranSQL';

router.get('/:category', async (req, res) => {
  const postList = await tranSQL.getOne(
    `SELECT	p.id			              AS id,		  	-- post id
            p.title				          AS title, 		-- post title
            IFNULL(p.viewCount,0)		AS viewCount,	-- post view count
            p.content		  	    AS content,		-- post text
            u.id			  	      AS userId,		-- user key
            u.nickname			    AS nickname,	-- user nickname
            u.profileImage	    AS profileImage,-- user profile image
            p.createAt			    AS createAt,	-- post create Date
            IFNULL(rep.cnt,0)  	AS replyCnt,	-- post reply cnt
            img.path	  		    AS filePath		-- post main img src
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
});

router.get('/:category/:post', async (req, res) => {
  const { category, post }: { category: string; post: string } = req.params;
  const postDetail = await tranSQL.getOne(
    `SELECT	p.title		  		  AS title,			  -- post title
          IFNULL(p.viewCount,0) 	AS viewCount,		-- post view count
          p.content	   			  AS text,			  -- post text
          u.id      			    AS userId,			-- user key
          u.nickname		      AS nickname,		-- user nickname
          u.profileImage      AS profileImage,-- user profile image
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
});

router.post('/', async (req, res) => {
  const [{ category, user, title, content }]: [
    { category: number; user: number; title: string; content: string }
  ] = req.body;
  const insertId = await tranSQL.postOne(
    `INSERT INTO Post(category, user, title, content)
     VALUES (?)
  `,
    [[category, user, title, content]]
  );
  res.redirect(`/post/${category}/${insertId}`);
});

router.put('/:category/:post', async (req, res) => {
  const { category, post }: { category: string; post: string } = req.params;
  const { title, content }: { title: string; content: string } = req.body;
  await tranSQL.putOne(
    `
   UPDATE Post
      SET title = ?,
          content = ?,
          updateAt = now()
    WHERE id = ?
   `,
    [title, content, post]
  );
  res.redirect(`/post/${category}/${post}`);
});

router.delete('/:category/:post', async (req, res) => {
  const { category, post }: { category: string; post: string } = req.params;
  await tranSQL.putOne(
    `
    UPDATE Post
       SET deleteAt = now()
     WHERE id = ?
    `,
    [post]
  );
  res.redirect(`/post/${category}`);
});
export default router;
