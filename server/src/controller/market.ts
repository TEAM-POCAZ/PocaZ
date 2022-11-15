import { Request, Response, NextFunction } from 'express';
// const router = express.Router();
import { tranSQL } from '../utils/tranSQL';
import { IMarket, IMarket2 } from '../interface/IMarket';
import { sqlSelectHandler } from '../utils/sqlHandler';

export default {
  getMarket: async (req: Request, res: Response) => {
    const { id } = req.params;
    res.send(
      await tranSQL.getOne(
        ` ${tranSQL.market.main}
          ${tranSQL.market.detail}
          ${tranSQL.market.from}
          ${tranSQL.where('pcs.id')}`,
        [id]
      )
    );
  },

  getMarkets: async (req: Request, res: Response) => {
    const {
      query: { keyword, lastPostId, SIZE, group, userId },
    } = req;

    const keywordMap: string =
      typeof keyword === 'string'
        ? keyword
            .split('.')
            .reduce(
              (result: string, kw: string) =>
                `${result} OR pcs.title LIKE '%${kw}%' OR pcs.description LIKE '%${kw}%'`,
              ''
            )
        : '';
    // console.log( typeof group)
    const sellList: IMarket2[] = await sqlSelectHandler(
      `${tranSQL.market.main}
       ${tranSQL.market.from}
       ${
         keyword
           ? `AND (1 != 1
       ${keywordMap})`
           : ''
       }
       AND pcs.deleteAt IS NULL
       AND pcs.id < ?
       ${group ? `AND ag.id = ${group} ` : ''}
       ${userId ? `AND u.id =${userId} ` : ''} 
       ORDER BY pcs.id DESC
       LIMIT ?`,
      [lastPostId || Number.MAX_SAFE_INTEGER, SIZE || '30']
    );
    // res.send(sellList);
    const nextId =
      typeof lastPostId === 'string' &&
      typeof SIZE === 'string' &&
      parseInt(lastPostId) > 0 &&
      sellList.length === parseInt(SIZE)
        ? sellList[sellList.length - 1]?.id - 1
        : null;
    const previousId =
      (lastPostId || Number.MAX_SAFE_INTEGER > 0) && typeof SIZE === 'string'
        ? sellList[0]?.id + parseInt(SIZE)
        : null;

    res.send({ sellList, nextId, previousId });
  },
  writeMarket: async (req: any, res: Response) => {
    const [{ photocard, title, description, price }]: IMarket[] = req.body;
    const user = req.user.id;
    const insertId = await tranSQL.postOne(
      `INSERT INTO PhotocardSellArticle (photocard, user, title, description, price, viewCount, tradeStatus)
       VALUES (?, 0, 1)`,
      [[photocard, user, title, description, price]]
    );
    res.send([insertId]);
  },
  modifyMarket: async (req: any, res: Response) => {
    const { id } = req.params;
    const user = req.user.id;
    const [{ title, description, price }]: IMarket2[] = req.body;
    await tranSQL.getOne(
      `UPDATE PhotocardSellArticle
          SET title = ?,
              description = ?,
              price = ?,
              refreshedDate = now()
        WHERE 1 = 1
        ${tranSQL.where('id')}
        ${tranSQL.where('user')}`,
      [title, description, price, id, user]
    );
    res.send('successfully fixed on market!!');
  },
  deleteMarket: async (req: Request, res: Response) => {
    const { id } = req.params;
    await tranSQL.putOne(
      `UPDATE PhotocardSellArticle
          SET deleteAt = now()
        WHERE id = ?`,
      [id]
    );
    res.send('successfully erased from market!!');
  },
};
