import { Request, Response, NextFunction } from 'express';
import { tranSQL } from '../utils/tranSQL';
import { IGalmang } from '../interface/IGalmang';

export default {
  getGalmang: async (req: Request, res: Response) => {
    const { user } = req.params;
    res.send(
      await tranSQL.getOne(
        `${tranSQL.galmang}
         ${tranSQL.where('user')}`,
        [user]
      )
    );
  },
  writeGalmang: async (req: Request, res: Response) => {
    const { user } = req.params;
    const galmangs: number[] = req.body;
    // const galmangs: IGalmang[] = req.body;
    try {
      await tranSQL.postOne(
        `INSERT INTO GalmangPhotoCard (user, photocard)
           VALUES ?`,
        [galmangs.map((galmang: number) => [user, galmang])]
      );
      res.send('correctly sended');
    } catch (err) {
      throw err;
    }
  },
  deleteGalmang: async (req: Request, res: Response) => {
    const { id, user } = req.params;
    await tranSQL.putOne(
      `DELETE FROM GalmangPhotoCard
        WHERE 1 = 1
       ${tranSQL.where('id')}
       ${tranSQL.where('user')}`,
      [id, user]
    );
    res.send(`${id} removed!`);
  },
};
