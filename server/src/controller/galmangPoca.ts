import express from 'express';
const router = express.Router();
import { tranSQL } from '../utils/tranSQL';
import { IGalmang } from '../interface/IGalmang';

router.get('/:user', async (req, res) => {
  const { user } = req.params;
  res.send(
    await tranSQL.getOne(
      `${tranSQL.galmang}
       ${tranSQL.where('user')}`,
      [user]
    )
  );
});

router.post('/', async (req, res) => {
  const galmangs: IGalmang[] = req.body;
  try {
    await tranSQL.postOne(
      `INSERT INTO GalmangPhotoCard (user, photocard)
         VALUES ?`,
      [
        galmangs.map((galmang: IGalmang) => {
          const { user, photocard } = galmang;
          return [user, photocard];
        }),
      ]
    );
    res.send('correctly sended');
  } catch (err) {
    throw err;
  }
});

router.delete('/:id', async (req, res) => {
  const { id }: { id: string } = req.params;
  await tranSQL.putOne(
    `DELETE FROM GalmangPhotoCard
      WHERE 1 = 1
     ${tranSQL.where('id')}`,
    [id]
  );
  res.send(`${id} removed!`);
});

export default router;
