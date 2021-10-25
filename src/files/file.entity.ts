import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { FileStatus } from "./file-status.enum";

@Entity()
export class File{

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  status: FileStatus
}