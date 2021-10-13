import { IsEnum } from "class-validator";
import { FileStatus } from "../files.model";

export class UpdateFileStatusDto{
  @IsEnum(FileStatus, {
    message: `status must be one of the following: ${Object.values(FileStatus)}`,
  })
  status: FileStatus
}