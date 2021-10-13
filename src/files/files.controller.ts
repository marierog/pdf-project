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
import { File, FileStatus } from './files.model';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Get()
  getFiles(@Query() filterDto: getFileFilterDto): File[] {
    if(Object.keys(filterDto).length){
      return this.filesService.getFilesWithFilters(filterDto);
    } else {
      return this.filesService.getAllFiles();
    }
  }

  @Post()
  createFile(@Body() createFIleDto: CreateFileDto): File {
    return this.filesService.createFile(createFIleDto);
  }

  @Get('/:id')
  getFileById(@Param('id') id: string): File {
    return this.filesService.getFileById(id);
  }

  @Delete('/:id')
  deleteFile(@Param('id') id: string): void {
    this.filesService.deleteFile(id);
  }

  @Patch('/:id/status')
  updateFile(@Param('id') id: string, @Body() updateFileStatusDto: UpdateFileStatusDto): File {
    const { status } = updateFileStatusDto;
    return this.filesService.updateFile(id, status);
  }
}
