import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileRepository } from './file.repository';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([FileRepository])
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
