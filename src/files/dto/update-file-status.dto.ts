import { IsEnum } from "class-validator";
import { FileStatus } from "../file-status.enum";

export class UpdateFileStatusDto{
  @IsEnum(FileStatus, {
    message: `status must be one of the following: ${Object.values(FileStatus)}`,
  })
  status: FileStatus
}