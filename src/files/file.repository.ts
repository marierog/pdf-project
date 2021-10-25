import { EntityRepository, Repository } from "typeorm";
import { CreateFileDto } from "./dto/create-file.dto";
import { getFileFilterDto } from "./dto/get-file-filter.dto";
import { FileStatus } from "./file-status.enum";
import { File } from "./file.entity";

@EntityRepository(File)
export class FileRepository extends Repository<File>{
  async getFiles(filterDto: getFileFilterDto): Promise<File[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');

    if(search){
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        {search: `%${search}%`}
      )
    }

    if(status){
      query.andWhere('task.status = :status', { status })
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async createFile(createFileDto: CreateFileDto) : Promise<File>{
    const { title, description } = createFileDto;
    const file = this.create({
      title,
      description,
      status: FileStatus.CREATED,
    });
    await this.save(file);
    return file;
  }
}