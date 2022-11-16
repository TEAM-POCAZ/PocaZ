import { Request, Response, NextFunction } from 'express';
import { config } from '../config';

const REACT_URL: string = config.host.reactAppHostUrl;

function checkAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    return next();
  }
  //next(new Error('not Authenticated User'));
  //차라리 이걸 로그인 페이지로 리다이렉션하는게?
  //--> 에러처리에서 리다이렉션하는게 나을듯. 그것도 백->프론트 전송한 다음?
  return res.redirect(`${REACT_URL}/login`);
}

export { checkAuthenticated };
