export interface File{
  id: string,
  title: string,
  description: string,
  status: FileStatus,
}

export enum FileStatus {
  CREATED = "CREATED",
  IN_PROGRESS = "IN_PROGRESS",
  CONVERTED = "CONVERTED"
}
