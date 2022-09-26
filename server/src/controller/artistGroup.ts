import express from 'express';
const router = express.Router();
import { tranSQL } from '../utils/tranSQL';
import { IArtistGroup } from '../interface/IArtistGroup';

router.get('/', async (req, res) => {
  res.send(await tranSQL.getOne(tranSQL.artistGroup));
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  res.send(
    await tranSQL.getOne(
      `${tranSQL.artistGroup}
       ${tranSQL.where('id')}`,
      [id]
    )
  );
});

router.post('/', async (req, res) => {
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
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const [{ englishName, koreanName, grouplogoUrl }]: [IArtistGroup] = req.body;
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
});

router.delete('/:id', async (req, res) => {
  const { id }: { id: string } = req.params;
  tranSQL.putOne(
    `DELETE FROM ArtistGroup
      WHERE 1 = 1
     ${tranSQL.where('id')}`,
    [id]
  );
  res.send(`${id} removed!`);
});

export default router;
