import { Request, Response, NextFunction } from 'express';
import { tranSQL } from '../utils/tranSQL';

export default {
  totalLikes: async (req: Request, res: Response) => {
    const { user } = req.params;

    res.send(
      await tranSQL.getOne(
        `SELECT IFNULL(count(*),0) cnt
             FROM LikeManage
            WHERE 1 = 1
        ${tranSQL.where('user')}`,
        [user]
      )
    );
  },
  getPostLikes: async (req: Request, res: Response) => {
    const { post, user } = req.params;

    res.send(
      await tranSQL.getOne(
        `SELECT post, IFNULL(count(user),0) cnt
         FROM LikeManage
        WHERE 1 = 1
        ${tranSQL.where('post')}
         ${tranSQL.where('user')} 
        GROUP BY post`,
        [post, user]
      )
    );
  },
  writeLikes: async (req: Request, res: Response) => {
    const { post, user } = req.params;
    res.send(
      await tranSQL.putOne(
        `
        INSERT IGNORE INTO LikeManage (post, user)
        VALUES ( ? , ? )`,
        [post, user]
      )
    );
  },
  deleteLikes: async (req: Request, res: Response) => {
    const { post, user } = req.params;
    res.send(
      await tranSQL.putOne(
        `
      DELETE IGNORE FROM LikeManage
       WHERE 1 = 1
         AND post = ?
         AND user = ?`,
        [post, user]
      )
    );
  },
};
