import express from 'express';
const router = express.Router();
import agencies from '../controller/agency';

router.post('/', agencies.writeAgency);

router.get('/', agencies.getAgencies);

router.get('/:id', agencies.getAgency);

router.put('/:id', agencies.modifyAgency);

router.delete('/:id', agencies.deleteAgency);

export default router;
