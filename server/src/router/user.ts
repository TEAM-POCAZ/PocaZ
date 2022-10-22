import { Router } from 'express';

import { Request, Response, NextFunction } from 'express';
import { User, UserCreationDto, UserUpdateDto } from '../entity/user';

const userRouter = Router();

userRouter.get('/', async (req, res) => {
  return res.json(await User.selectAll());
});

userRouter.get('/id/:id', async (req, res) => {
  const { id } = req.params;
  return res.json(await User.selectById(id)); //없으면 바디없음
});

userRouter.get('/username/:username', async (req, res) => {
  const { username } = req.params;
  return res.json(await User.selectByUsername(username)); //없으면 바디없음
});

userRouter.post('/', async (req, res) => {
  const user: UserCreationDto = req.body;
  return res.json(await User.create(user));
});

userRouter.put('/', async (req, res) => {
  const user: UserUpdateDto = req.body;
  return res.json(await User.update(user));
});

userRouter.delete('/id/:id', async (req, res) => {
  const { id } = req.params;
  return res.json(await User.softDelete(id));
});

export default userRouter;
