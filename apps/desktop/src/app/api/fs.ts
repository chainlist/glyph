import { stat, readdir } from 'fs-extra';
import { parse, join, relative } from 'node:path';
import { IFileInfo } from '@glyph/types';

export async function readDirectory(path: string) {
  const files = await readdir(path, { withFileTypes: true });

  return files.filter((f) => f.isFile());
}

export async function getVirtualFileSystem(path: string) {
  const fileInfo = await getFileInfo(path);

  fileInfo.children = await marchDirectories(
    path,
    fileInfo,
    fileInfo.directory
  );

  return fileInfo;
}

async function marchDirectories(
  path: string,
  parent?: IFileInfo,
  rootPath?: string
) {
  const files = await readdir(path);
  const fileInfos = (
    await Promise.all(
      files.map((file) => getFileInfo(join(path, file), rootPath))
    )
  ).filter((fi) => fi.isDirectory && !fi.name.startsWith('.'));

  for (const fileInfo of fileInfos) {
    fileInfo.parent = parent;
    fileInfo.children = await marchDirectories(
      fileInfo.path,
      fileInfo,
      rootPath
    );
  }

  return fileInfos;
}

export async function getFileInfo(
  path: string,
  rootPath?: string
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
