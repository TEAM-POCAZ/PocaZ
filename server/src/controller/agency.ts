import { Request, Response, NextFunction } from 'express';
import { tranSQL } from '../utils/tranSQL';

export default {
  getAgencies: async (req: Request, res: Response) => {
    res.send(await tranSQL.getOne(tranSQL.agency));
  },
  getAgency: async (req: Request, res: Response) => {
    const { id } = req.params;
    res.send(
      await tranSQL.getOne(
        `${tranSQL.agency}
         ${tranSQL.where('id')}`,
        [id]
      )
    );
  },
  writeAgency: async (req: Request, res: Response) => {
    const agency: string[] = req.body;
    await tranSQL.postOne(
      `INSERT INTO Agency (name)
       VALUES ?`,
      [agency.map((ag) => [ag])]
    );
    res.send('correctly sended');
  },
  modifyAgency: async (req: Request, res: Response) => {
    const { id } = req.params;
    const [agency]: string[] = req.body;
    await tranSQL.putOne(
      `UPDATE Agency
          SET name = ?
        WHERE 1 = 1
        ${tranSQL.where('id')}
      `,
      [agency, id]
    );

    res.send('소속사 이름이 수정되었습니다');
  },
  deleteAgency: async (req: Request, res: Response) => {
    const { id } = req.params;
    tranSQL.putOne(
      `DELETE FROM Agency
        WHERE 1 = 1
       ${tranSQL.where('id')}`,
      [id]
    );
    res.send(`${id} removed!`);
  },
};
