import { stat } from 'fs-extra';
import { parse } from 'node:path';

export async function getFileInfo(path: string) {
  try {
    const stats = await stat(path);
    const parsedPath = parse(path);
    const isFile = stats.isFile();
    const isDirectory = stats.isDirectory();

    return {
      ext: isFile ? parsedPath.ext : '',
      name: parsedPath.name,
      directory: parsedPath.dir,
      path,
      isFile,
      isDirectory,
    };
  } catch {
    return null;
  }
}
