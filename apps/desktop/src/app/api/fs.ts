import {
  stat,
  readdir,
  exists,
  readJSON,
  readFile as nodeReadFile,
} from 'fs-extra';
import { parse, join, relative } from 'node:path';
import { IFileInfo } from '@glyph/types';

export async function readDirectory(path: string) {
  const files = await readdir(path, { withFileTypes: true });

  return files.filter((f) => f.isFile());
}

export async function getVirtualFileSystem(path: string): Promise<IFileInfo[]> {
  const fileInfo = await getFileInfo(path);
  const files = await marchDirectories(path, fileInfo.path);

  return [fileInfo, ...files];
}

async function marchDirectories(
  path: string,
  rootPath?: string,
): Promise<IFileInfo[]> {
  const files = await readdir(path);

  const filesInfo = await Promise.all(
    files
      .filter((f) => !f.startsWith('.')) // Avaid parsing hidden files and directories
      .map((f) => getFileInfo(join(path, f), rootPath)),
  );

  const directories = filesInfo
    .filter((f) => f.isDirectory)
    .map((f) => marchDirectories(f.path, rootPath));

  const nestedFiles = await Promise.all(directories);

  return [...filesInfo, ...nestedFiles.flat()];
}

export async function readBoardFile(directory: string): Promise<string | null> {
  if (exists(directory)) {
    return await readJSON(join(directory, '.board.canvas'), {
      encoding: 'utf-8',
    });
  }

  return Promise.resolve(null);
}

export async function readFile(path: string): Promise<string> {
  return nodeReadFile(path, { encoding: 'utf-8' });
}

export async function getFileInfo(
  path: string,
  rootPath?: string,
): Promise<IFileInfo | null> {
  try {
    const stats = await stat(path);
    const parsedPath = parse(path);
    const isFile = stats.isFile();
    const isDirectory = stats.isDirectory();
    const relativePath = rootPath ? relative(rootPath, path) : parsedPath.name;

    return {
      ext: isFile ? parsedPath.ext : '',
      name: parsedPath.name,
      directory: parsedPath.dir,
      path,
      isFile,
      isDirectory,
      size: stats.size,
      relativePath,
    };
  } catch {
    return null;
  }
}
