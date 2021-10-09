import { Injectable } from '@nestjs/common';
import { File, FileStatus } from './files.model';
import { v4 as uuid } from 'uuid';
import { CreateFileDto } from './dto/create-file.dto';
import { getFileFilterDto } from './dto/get-file-filter.dto';
import { filter } from 'rxjs';

@Injectable()
export class FilesService {
  private files: File[] = [];

  getAllFiles(): File[] {
    return this.files;
  }

  getFilesWithFilters(filterDto: getFileFilterDto): File[] {
    const { status, search } = filterDto;
    let files = this.getAllFiles();
    if (status) {
      files = files.filter((file) => file.status === status);
    }
    if (search) {
      files = files.filter(
        (file) =>
          file.title.includes(search) || file.description.includes(search),
      );
    }
    return files;
  }

  getFileById(id: string): File {
    return this.files.find((file) => file.id === id);
  }

  createFile(createFileDto: CreateFileDto): File {
    const { title, description } = createFileDto;
    const file: File = {
      id: uuid(),
      title: title,
      description: description,
      status: FileStatus.CREATED,
    };
    this.files.push(file);
    return file;
  }

  updateFile(id: string, status: FileStatus): File {
    const file = this.getFileById(id);
    file.status = status;
    return file;
  }

  deleteFile(id: string): void {
    this.files = this.files.filter((file) => file.id !== id);
  }
}
