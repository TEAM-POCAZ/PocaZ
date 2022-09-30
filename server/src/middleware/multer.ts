import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { tranSQL } from '../utils/tranSQL';
import multer from 'multer';

const fileStorage = multer.diskStorage({
  // 저장 폴더 위치
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, 'uploads/');
  },
  //파일 이름
  // filename: (req: Request, file: Express.Multer.File, cb) => {
  //   cb(
  //     null,
  //     `${new Date().valueOf()}${file.filename}${path.extname(
  //       file.originalname
  //     )}`
  //   );
  // },
});
const multerUpload = multer({
  storage: fileStorage,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB 로 제한
  },
});

const uploadFiles = async (req: Request, res: Response) => {
  // console.log(req.files);
  // console.log(req.body);
  const files = req.files as Express.Multer.File[];
  if (files?.length === 0) res.send('please send more than ones');
  else {
    const fileId: string = await tranSQL.postOne(
      `
      INSERT INTO File (name, path)
      VALUES ?`,
      [
        files.map((file: Express.Multer.File): string[] => [
          file.originalname,
          file.filename,
        ]),
      ]
    );
    res.send(
      ((fileId) => {
        const filesKeys: number[] = [];
        for (let i = 0; i < files.length; i += 1) {
          filesKeys.push(parseInt(fileId) + i);
        }
        return filesKeys;
      })(fileId)
    );
  }
};

export { multerUpload, uploadFiles };
