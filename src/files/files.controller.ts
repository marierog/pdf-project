import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { title } from 'process';
import { CreateFileDto } from './dto/create-file.dto';
import { getFileFilterDto } from './dto/get-file-filter.dto';
import { UpdateFileStatusDto } from './dto/update-file-status.dto';
import { FileStatus } from './file-status.enum';
import { File } from './file.entity';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Get()
  getFiles(@Query() filterDto: getFileFilterDto): Promise<File[]> {
    return this.filesService.getFiles(filterDto);
  }

  @Post()
  createFile(@Body() createFileDto: CreateFileDto): Promise<File> {
    return this.filesService.createFile(createFileDto);
  }

  
  @Get('/:id')
  getFileById(@Param('id') id: string): Promise<File> {
    return this.filesService.getFileById(id);
  }

  @Delete('/:id')
  deleteFile(@Param('id') id: string): Promise<void> {
    return this.filesService.deleteFile(id);
  }

  @Patch('/:id/status')
  updateFile(@Param('id') id: string, @Body() updateFileStatusDto: UpdateFileStatusDto): Promise<File> {
    const { status } = updateFileStatusDto;
    return this.filesService.updateFile(id, status);
  }
}
