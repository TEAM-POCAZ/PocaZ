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
      query: { lastPostId, SIZE },
    } = req;
    
    const sellList: IMarket2[] = await sqlSelectHandler(
      `${tranSQL.market.main}
       ${tranSQL.market.from}
       AND pcs.id < ?
       ORDER BY pcs.id DESC
       LIMIT ?`,
       [lastPostId || Number.MAX_SAFE_INTEGER,
        SIZE || '30']
    );
    // res.send(sellList);
    const nextId = typeof lastPostId === 'string' && typeof SIZE === 'string' && 
                     parseInt(lastPostId) > 0 && sellList.length === parseInt(SIZE)
      ? sellList[sellList.length - 1]?.id - 1
      : null;
    const previousId = (lastPostId || Number.MAX_SAFE_INTEGER > 0) && typeof SIZE === 'string'
          ? sellList[0].id + parseInt(SIZE) : null;
      
    res.send({ sellList, nextId, previousId })
  },
  writeMarket: async (req: Request, res: Response) => {
    const [{ photocard, user, title, description, price }]: IMarket[] =
      req.body;
    await tranSQL.getOne(
      `INSERT INTO PhotocardSellArticle (photocard, user, title, description, price, viewCount, tradeStatus)
       VALUES (?, 0, 1)`,
      [[photocard, user, title, description, price]]
    );
    res.send('successfully posted on market!!');
  },
  modifyMarket: async (req: Request, res: Response) => {
    const { id } = req.params;
    const [
      { photocard, user, title, description, price, tradeStatus },
    ]: IMarket2[] = req.body;
    await tranSQL.getOne(
      `UPDATE PhotocardSellArticle
          SET photocard = ?,
              title = ?,
              description = ?,
              price = ?,
              tradeStatus = ?,
              refreshedDate = now()
        WHERE 1 = 1
        ${tranSQL.where('id')}
        ${tranSQL.where('user')}`,
      [photocard, title, description, price, tradeStatus, id, user]
    );
    res.send('successfully fixed on market!!');
  },
  deleteMarket: async (req: Request, res: Response) => {
    const { id } = req.params;
    await tranSQL.getOne(
      `DELETE FROM PhotocardSellArticle
        WHERE 1 = 1
        ${tranSQL.where('id')}`,
      [id]
    );

    res.send('successfully erased from market!!');
  },
};
