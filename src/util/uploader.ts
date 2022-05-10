/* eslint-disable prettier/prettier */
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './filename';

export const Uploader = {
  storage: diskStorage({
    destination: './uploads',
    filename: editFileName,
  }),
  limits: { fileSize: 100000000 },
  fileFilter: imageFileFilter,
};
