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
  const { agency }: { agency: string } = req.body;
  tranSQL.postOne(
    `INSERT INTO Agency (name)
     VALUES ?`,
    [agency]
  );
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { agency }: { agency: string } = req.body;
  tranSQL.putOne(
    `UPDATE Agency
        SET = ?
      WHERE 1 = 1
      ${tranSQL.where('id')}
    `,
    [agency, id]
  );
});

export default router;
