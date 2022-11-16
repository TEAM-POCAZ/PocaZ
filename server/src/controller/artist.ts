import { Request, Response, NextFunction } from 'express';
import { tranSQL } from '../utils/tranSQL';
import { RowDataPacket, OkPacket } from 'mysql2';
import { IArtist } from '../interface/IArtist';
import { sqlSelectHandler } from '../utils/sqlHandler';
export default {
  getArtists: async (req: Request, res: Response) => {
    res.send(await tranSQL.getOne(tranSQL.artist));
  },
  getArtist: async (req: Request, res: Response) => {
    const { id } = req.params;
    const artists = await sqlSelectHandler(
      `${tranSQL.artist}
       ${tranSQL.where('id')}`,
      [id]
    );
    res.send(artists[0]);
  },
  writeArtist: async (req: Request, res: Response) => {
    const artists: IArtist[] = req.body;
    try {
      await tranSQL.postOne(
        `INSERT INTO Artist (agency, artistGroup, stageName, realName)
           VALUES ?`,
        [
          artists.map((artist: IArtist) => {
            const { agency, artistGroup, stageName, realName } = artist;
            return [agency, artistGroup, stageName, realName];
          }),
        ]
      );
      res.send(`${artists.length} artist(s) submited`);
    } catch (err) {
      throw err;
    }
  },
  modifyArtist: async (req: Request, res: Response) => {
    const { id } = req.params;
    const [{ agency, artistGroup, stageName, realName }]: [IArtist] = req.body;
    await tranSQL.putOne(
      `UPDATE Artist
          SET agency = ?,
              artistGroup = ?,
              stageName = ?,
              realName = ?,
              updateAt = now()
        WHERE 1  = 1
          ${tranSQL.where('id')}
        `,
      [agency, artistGroup, stageName, realName, id]
    );

    res.send('correctly sended');
  },
  deleteArtist: async (req: Request, res: Response) => {
    const { id } = req.params;
    await tranSQL.putOne(
      `DELETE FROM Artist
        WHERE 1 = 1
       ${tranSQL.where('id')}`,
      [id]
    );
    res.send(`${id} removed!`);
  },
};
