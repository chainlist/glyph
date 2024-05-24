export interface IFileInfo {
  ext: string;
  name: string;
  directory: string;
  path: string;
  relativePath?: string;
  isFile: boolean;
  isDirectory: boolean;
  parent?: IFileInfo;
  children?: IFileInfo[];
  files?: IFileInfo[];
  size: number;
}
