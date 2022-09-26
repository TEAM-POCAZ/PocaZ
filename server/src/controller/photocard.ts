import express from 'express';
const router = express.Router();
import { tranSQL } from '../utils/tranSQL';
import { IPhotocard } from '../interface/IPhotocard';

router.get('/', async (req, res) => {
  res.send(await tranSQL.getOne(tranSQL.photocard));
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  res.send(
    await tranSQL.getOne(
      `${tranSQL.photocard}
       ${tranSQL.where('pc.id')}`,
      [id]
    )
  );
});

router.post('/', async (req, res) => {
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
});

router.put('/:id', async (req, res) => {
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
});

router.delete('/:id', async (req, res) => {
  const { id }: { id: string } = req.params;
  await tranSQL.putOne(
    `DELETE FROM Photocard
      WHERE 1 = 1
     ${tranSQL.where('id')}`,
    [id]
  );
  res.send(`${id} removed!`);
});

export default router;
