import { Request, Response, NextFunction } from 'express';
import { IReply, IReplyM } from '../interface/IReply';
import { tranSQL } from '../utils/tranSQL';
import { sqlSelectHandler } from '../utils/sqlHandler';

export default {
  getReplys: async (req: Request, res: Response) => {
    const oneDepth: IReplyM[] = await sqlSelectHandler(
      `${tranSQL.reply}
       AND pid IS NULL
       ${tranSQL.where('r.post')}`,
      [req.params.post]
    );

    const twoDepth: IReply[] = await sqlSelectHandler(
      `${tranSQL.reply}
       AND pid IS NOT NULL
       ${tranSQL.where('r.post')}`,
      [req.params.post]
    );

    res.send(
      // oneDepth.map((preply: IReplyM) => {
      //   preply.reply = twoDepth.filter((rep: IReply) => rep.pid == preply.id);
      //   return preply;
      // }
      [oneDepth, twoDepth]
    );
  },
  getReply: async (req: Request, res: Response) => {
    const { id } = req.params;
    const reply = await tranSQL.getOne(
      `${tranSQL.reply}
       ${tranSQL.where('r.id')}`,
      [id]
    );
    // console.log(reply);
    res.send(reply);
  },
  writeReply: async (req: Request, res: Response) => {
    const { category, post, user } = req.params;
    const [{ pid, content }] = req.body;
    await tranSQL.postOne(
      `INSERT INTO Reply (post, pid, user, content)
      VALUES ( ? )`,
      [[parseInt(post), pid, user, content]]
    );
    res.send('successfully replied!');
  },
  modifyReply: async (req: Request, res: Response) => {
    const { category, post, id, user } = req.params;
    const { content } = req.body;
    // console.log(user, id, post, content);
    await tranSQL.putOne(
      `UPDATE Reply
          SET content = ?
        WHERE id = ?
          AND user = ?
          AND post = ?`,
      [content, id, user, post]
    );
    res.send('successfully modified');
  },
  deleteReply: async (req: Request, res: Response) => {
    const { category, post, id, user } = req.params;

    await tranSQL.putOne(
      `UPDATE Reply
          SET deleteAt = now()
        WHERE id   = ?
          AND user = ?
          AND post = ?`,
      [id, user, post]
    );
    // res.redirect(`/post/${category}/${post}`);
    res.send('successfully erased!');
  },
};
