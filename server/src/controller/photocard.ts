import { Request, Response, NextFunction } from 'express';
import { tranSQL } from '../utils/tranSQL';
import { IPhotocard } from '../interface/IPhotocard';

export default {
  getPhotocards: async (req: Request, res: Response) => {
    res.send(await tranSQL.getOne(tranSQL.photocard));
  },
  getPhotocard: async (req: Request, res: Response) => {
    const { id } = req.params;
    res.send(
      await tranSQL.getOne(
        `${tranSQL.photocard}
         ${tranSQL.where('pc.id')}`,
        [id]
      )
    );
  },
  writePhotocard: async (req: Request, res: Response) => {
    const photocards: IPhotocard[] = req.body;
    try {
      await tranSQL.postOne(
        `INSERT INTO Photocard (artist, path, name, description)
           VALUES ?`,
        [
          photocards.map((photocard: IPhotocard) => {
            const { artist, path, name, description } = photocard;
            return [artist, path, name, description];
          }),
        ]
      );
      res.send('correctly sended');
    } catch (err) {
      throw err;
    }
  },
  modifyPhotocard: async (req: Request, res: Response) => {
    const { id } = req.params;
    const [{ artist, path, name, description }]: [IPhotocard] = req.body;
    await tranSQL.putOne(
      `UPDATE Photocard
          SET artist = ?, 
              path = ?, 
              name = ?, 
              description = ?,
              updateAt = now()
        WHERE 1  = 1
          ${tranSQL.where('id')}
        `,
      [artist, path, name, description, id]
    );

    res.send('correctly sended');
  },
  deletePhotocard: async (req: Request, res: Response) => {
    const { id } = req.params;
    // console.log(id);
    try {
      await tranSQL.putOne(
        `DELETE FROM Photocard
          WHERE 1 = 1
         ${tranSQL.where('id')}`,
        [id]
      );
    } catch (err) {
      throw err;
    } finally {
      res.send(`${id} removed!`);
    }
  },
};
