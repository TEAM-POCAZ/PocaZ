import express from 'express';
const router = express.Router();
import replyRouter from './reply';
import likesRouter from './likes';
import { tranSQL } from '../utils/tranSQL';

router.use('/reply', replyRouter);
router.use('/likes', likesRouter);

router.get('/:category', async (req, res) => {
  const postList = await tranSQL.getOne(
    `SELECT	p.id			    AS id,		  	-- post id
            p.title				AS title, 		-- post title
            p.viewCount			AS viewCount,	-- post view count
            p.content		  	AS content,		-- post text
            u.id			  	AS userId,		-- user key
            u.nickname			AS nickname,	-- user nickname
            u.profileImage	    AS profileImage,-- user profile image
            p.createAt			AS createAt,	-- post create Date
            ifnull(rep.cnt,0)  	AS replyCnt,	-- post reply cnt
            img.path	  		AS filePath		-- post main img src
       FROM Post p
      INNER JOIN USER u ON p.user = u.id
       LEFT JOIN (SELECT id, count(*) as cnt
                    FROM Reply
                   GROUP BY id) rep on p.id = rep.id
       LEFT JOIN (SELECT image.post, f.path
                    FROM PostImage image
                    LEFT JOIN File f on image.file = f.id
                   LIMIT 1) img on p.id = img.post
      WHERE p.category = ?
      AND p.deleteAt IS NULL
      LIMIT ?`,
    [req.params.category, 100]
  );
  res.send(postList);
});

router.get('/:category/:post', async (req, res) => {
  const postDetail = await tranSQL.getOne(
    `SELECT	p.title		  		AS title,			  -- post title
          p.viewCount	    	AS viewCount,		-- post view count
          p.content	   			AS text,			  -- post text
          u.id      			  AS userId,			-- user key
          u.nickname		    AS nickname,		-- user nickname
          u.profileImage    AS profileImage,-- user profile image
          likes.cnt         AS likesCnt			-- post like cnt
    FROM Post p
   INNER JOIN USER u ON p.user = u.id
    LEFT JOIN (SELECT post, ifnull(count(*), 0) as cnt
                 FROM LikeManage
                GROUP BY post) likes ON p.id = likes.post
    LEFT JOIN (SELECT id, count(*) as cnt
                  FROM Reply
                GROUP BY id) rep on p.id = rep.id
   WHERE p.category = ?
     AND p.id = ?
     AND p.deleteAt IS NULL`,
    [req.params.category, req.params.post]
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
  const { category, post } = req.params;
  const { title, content } = req.body;
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
  const { category, post } = req.params;
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
