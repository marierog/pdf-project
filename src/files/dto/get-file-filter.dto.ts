import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { FileStatus } from "../files.model";

export class getFileFilterDto{

  @IsOptional()
  @IsEnum(FileStatus, {
    message: `status must be one of the following: ${Object.values(FileStatus)}`,
  })
  status: FileStatus;

  @IsOptional()
  @IsString()
  search: string;
}