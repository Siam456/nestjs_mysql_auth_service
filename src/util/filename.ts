/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus } from '@nestjs/common';
import { extname } from 'path';

export const editFileName = (req: any, file: any, callback: any) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

export const imageFileFilter = (req: any, file: any, cb: any) => {
  if (file.fieldname === 'files' || file.fieldname === 'file') {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(
        new HttpException(
          'Only .jpg, .png, .jpeg format allowed!!',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
        false,
      );
    }
  } else if (file.fieldname === 'txt') {
    if (file.mimetype === 'text/plain') {
      cb(null, true);
    } else {
      cb(
        new HttpException(
          'Only .txt format allowed!!',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
        false,
      );
    }
  }
};
