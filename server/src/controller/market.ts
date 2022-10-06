import { Request, Response, NextFunction } from 'express';
// const router = express.Router();
import { tranSQL } from '../utils/tranSQL';
import { IMarket, IMarket2 } from '../interface/IMarket';

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
    const sellList = await tranSQL.getOne(
      `${tranSQL.market.main}
       ${tranSQL.market.from}
       ORDER BY pcs.id`
    );
    res.send(sellList);
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
