import { FileStatus } from "../files.model";

export class getFileFilterDto{
  status?: FileStatus;
  search?: string;
}