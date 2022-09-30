import express from 'express';
const router = express.Router();
import groups from '../controller/artistGroup';

router.post('/', groups.writeGroup);

router.get('/', groups.getGroups);

router.get('/:id', groups.getGroup);

router.put('/:id', groups.modifyGroup);

router.delete('/:id', groups.deleteGroup);

export default router;
