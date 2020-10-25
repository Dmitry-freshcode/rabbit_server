import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  constructor() {}

  async removeAvatar(img:string) {
    fs.unlink(`${process.cwd()}/src/uploads/profileimages/${img}`, err => {
      if (err) {
        console.error(err);
        return;
      }
    });
    return true;
  }

}
