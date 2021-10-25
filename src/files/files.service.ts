import { Injectable, NotFoundException } from '@nestjs/common';
import { FileStatus } from './file-status.enum';
// import { v4 as uuid } from 'uuid';
import { CreateFileDto } from './dto/create-file.dto';
import { getFileFilterDto } from './dto/get-file-filter.dto';
import { FileRepository } from './file.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './file.entity';

@Injectable()
export class FilesService {

  constructor(
    @InjectRepository(FileRepository)
    private fileRepository: FileRepository,
  ){}

  getFiles(getFileDto: getFileFilterDto): Promise<File[]> {
    return this.fileRepository.getFiles(getFileDto);
  }


  async getFileById(id: string): Promise<File>{
    const found = await this.fileRepository.findOne(id);
    if(!found){
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  createFile(createFileDto: CreateFileDto): Promise<File> {
    return this.fileRepository.createFile(createFileDto);
  }

  async updateFile(id: string, status: FileStatus): Promise<File> {
    const file = await this.getFileById(id);
    file.status = status;
    this.fileRepository.save(file);
    return file;
  }

  async deleteFile(id: string): Promise<void> {
    const result = await this.fileRepository.delete(id);
    if(result.affected === 0){
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
