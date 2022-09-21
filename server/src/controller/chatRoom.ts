import { Request, Response, NextFunction } from 'express';

export const searchChatRoom = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send('chatroom!');
};
