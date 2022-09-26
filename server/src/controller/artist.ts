import express from 'express';
const router = express.Router();
import { tranSQL } from '../utils/tranSQL';
import { IArtist } from '../interface/IArtist';

router.get('/', async (req, res) => {
  res.send(await tranSQL.getOne(tranSQL.artist));
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  res.send(
    await tranSQL.getOne(
      `${tranSQL.artist}
       ${tranSQL.where('id')}`,
      [id]
    )
  );
});

router.post('/', async (req, res) => {
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
});

router.put('/:id', async (req, res) => {
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
});

router.delete('/:id', async (req, res) => {
  const { id }: { id: string } = req.params;
  await tranSQL.putOne(
    `DELETE FROM Artist
      WHERE 1 = 1
     ${tranSQL.where('id')}`,
    [id]
  );
  res.send(`${id} removed!`);
});

export default router;
