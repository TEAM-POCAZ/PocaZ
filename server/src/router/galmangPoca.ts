import express from 'express';
const router = express.Router();
import galmangs from '../controller/galmangPoca';

router.post('/:user', galmangs.writeGalmang);

router.get('/:user', galmangs.getGalmang);

router.delete('/:user/:id', galmangs.deleteGalmang);

export default router;
