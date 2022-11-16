import { Request, Response, NextFunction } from 'express';
import { tranSQL } from '../utils/tranSQL';

export default {
  getImages: async (req: Request, res: Response) => {
    const { market } = req.params;
    const imgList = await tranSQL.getOne(
      `SELECT pi.file, f.path
         FROM (SELECT photocardSellArticle, file
                 FROM PhotocardImage
                WHERE photocardSellArticle = ?) pi
        LEFT JOIN File f ON pi.file = f.id;`,
      [market]
    );
    res.send(imgList);
  },
  writeImages: async (req: Request, res: Response) => {
    const { market } = req.params;
    const { filesKeys } = req.body;
    await tranSQL.postOne(
      `INSERT INTO PhotocardImage (photocardSellArticle, file)
       VALUES ?`,
      [filesKeys.map((file: number) => [market, file])]
    );
    res.send('images added!!');
  },
  deleteImages: async (req: Request, res: Response) => {
    const { market } = req.params;
    const { filesKeys } = req.body;
    await tranSQL.postOne(
      `DELETE FROM PhotocardImage
        WHERE photocardSellArticle =  ?
          AND file IN (?)`,
      [market, filesKeys]
    );
    res.send('successfully erased');
  },
};
