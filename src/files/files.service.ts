import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  private files = ["file1", "file2"];

  getAllFiles() {
    return this.files;
  }
}
