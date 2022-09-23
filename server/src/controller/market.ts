import express from 'express';
const router = express.Router();
import { tranSQL } from '../utils/tranSQL';

router.get('/', async (req, res) => {
  const sellList = await tranSQL.getOne(
    `SELECT a.stageName     AS stageName,	  -- current stage Name
            ag.englishName	AS groupName,	  -- current group Name
            pc.path         AS pocaImg,     -- poca image
            pc.name		      AS pocaName,	  -- photocard Name
            pc.description	AS description, -- photocard description
            pcs.price		    AS price		    -- photocard sell Price
      FROM PhotocardSellArticle pcs
      LEFT JOIN Photocard pc on pcs.photocard = pc.id
        -- LEFT JOIN because photocard seller want to submit
        -- would not exists on POCAZ Database
      LEFT JOIN Artist a on pc.artist = a.id
      LEFT JOIN ArtistGroup ag on a.artistGroup = ag.id
      `
  );
  res.send(sellList);
});

export default router;
