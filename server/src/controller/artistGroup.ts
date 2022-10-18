import { Request, Response, NextFunction } from 'express';
import { tranSQL } from '../utils/tranSQL';
import { IArtistGroup } from '../interface/IArtistGroup';

export default {
  getGroups: async (req: Request, res: Response) => {
    res.send(await tranSQL.getOne(tranSQL.artistGroup));
  },
  getGroup: async (req: Request, res: Response) => {
    const { id } = req.params;
    res.send(
      await tranSQL.getOne(
        `${tranSQL.artistGroup}
       ${tranSQL.where('id')}`,
        [id]
      )
    );
  },
  writeGroup: async (req: Request, res: Response) => {
    const artistGroups: IArtistGroup[] = req.body;
    await tranSQL.postOne(
      `INSERT INTO ArtistGroup (englishName, koreanName, grouplogoUrl)
       VALUES ?`,
      [
        artistGroups.map((artistGroup: IArtistGroup) => {
          const { englishName, koreanName, grouplogoUrl } = artistGroup;
          return [englishName, koreanName, grouplogoUrl];
        }),
      ]
    );
    res.send('correctly sended');
  },
  modifyGroup: async (req: Request, res: Response) => {
    const { id } = req.params;
    const [{ englishName, koreanName, grouplogoUrl }]: [IArtistGroup] =
      req.body;
    tranSQL.putOne(
      `UPDATE ArtistGroup
          SET englishName   = ?,
              koreanName    = ?,
              grouplogoUrl  = ?
        WHERE 1 = 1
        ${tranSQL.where('id')}
      `,
      [englishName, koreanName, grouplogoUrl, id]
    );

    res.send('correctly sended');
  },
  deleteGroup: async (req: Request, res: Response) => {
    const { id } = req.params;
    await tranSQL.putOne(
      `DELETE FROM ArtistGroup
        WHERE 1 = 1
       ${tranSQL.where('id')}`,
      [id]
    );
    res.send(`${id} removed!`);
  },
};
