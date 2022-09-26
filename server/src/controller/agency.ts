import express from 'express';
const router = express.Router();
import { tranSQL } from '../utils/tranSQL';

router.get('/', async (req, res) => {
  res.send(await tranSQL.getOne(tranSQL.agency));
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  res.send(
    await tranSQL.getOne(
      `${tranSQL.agency}
       ${tranSQL.where('id')}`,
      [id]
    )
  );
});

router.post('/', async (req, res) => {
  const [{ agency }]: [{ agency: string }] = req.body;
  console.log([agency]);
  await tranSQL.postOne(
    `INSERT INTO Agency (name)
     VALUES (?)`,
    [[agency]]
  );
  res.send('correctly sended');
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const [{ agency }]: [{ agency: string }] = req.body;
  tranSQL.putOne(
    `UPDATE Agency
        SET name = ?
      WHERE 1 = 1
      ${tranSQL.where('id')}
    `,
    [agency, id]
  );

  res.send('correctly sended');
});

router.delete('/:id', async (req, res) => {
  const { id }: { id: string } = req.params;
  tranSQL.putOne(
    `DELETE FROM Agency
      WHERE 1 = 1
     ${tranSQL.where('id')}`,
    [id]
  );
  res.send(`${id} removed!`);
});

export default router;
