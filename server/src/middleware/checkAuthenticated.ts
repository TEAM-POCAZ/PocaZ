import { Request, Response, NextFunction } from "express";
function checkAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    return next();
  }
  throw new Error("not Authenticated User");
}

export { checkAuthenticated };
