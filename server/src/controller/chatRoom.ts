import { Request, Response, NextFunction } from 'express';

export const getChatRoom = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send('chatroom!');
};
