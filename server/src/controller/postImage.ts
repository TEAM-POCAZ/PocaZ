import { Request, Response, NextFunction } from 'express';
import { tranSQL } from '../utils/tranSQL';

export default {
  getImages: async (req: Request, res: Response) => {
    const { post } = req.params;
    const imgList = await tranSQL.getOne(
      `SELECT pi.post, f.path
         FROM (SELECT post, file
                 FROM PostImage
                WHERE post = ?) pi
        LEFT JOIN File f ON pi.file = f.id;`,
      [post]
    );
    res.send(imgList);
  },
  writeImages: async (req: Request, res: Response) => {
    const { post } = req.params;
    const { filesKeys } = req.body;
    await tranSQL.postOne(
      `INSERT INTO PostImage (post, file)
       VALUES ?`,
      [filesKeys.map((file: number) => [post, file])]
    );
    res.send('images added!!');
  },
  deleteImages: async (req: Request, res: Response) => {
    const { post } = req.params;
    const { filesKeys } = req.body;
    await tranSQL.postOne(
      `DELETE FROM PostImage
        WHERE post =  ?
          AND file IN (?)`,
      [post, filesKeys]
    );
    res.send('successfully erased');
  },
};
