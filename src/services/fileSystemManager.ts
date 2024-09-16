import * as FileSystem from 'expo-file-system';
import { FileInfo } from 'expo-file-system';

export class FileSystemManager {
  private static readonly DOCUMENT_DIR = FileSystem.documentDirectory;

  public static async checkAndCreateDir(path: string): Promise<boolean> {
    const fullPath = this.DOCUMENT_DIR + path;

    let dirExists = false;

    try {
      await FileSystem.readDirectoryAsync(fullPath);
      dirExists = true;
    } catch {
      /* empty */
    }

    if (!dirExists) {
      try {
        await FileSystem.makeDirectoryAsync(fullPath);
        dirExists = true;
      } catch {
        /* empty */
      }
    }

    return dirExists;
  }

  public static async resetDir(path: string): Promise<boolean> {
    const fullPath = this.DOCUMENT_DIR + path;

    try {
      await FileSystem.deleteAsync(fullPath);
    } catch {
      /* empty */
    }

    try {
      await FileSystem.makeDirectoryAsync(fullPath);
      return true;
    } catch {
      /* empty */
    }

    return false;
  }

  public static async writeDocumentFile(path: string, content: any) {
    const fullPath = this.DOCUMENT_DIR + path;
    const contentString = JSON.stringify(content);

    try {
      await FileSystem.writeAsStringAsync(fullPath, contentString);
    } catch (e: any) {
      /* empty */
    }
  }

  public static async readDocumentFile(path: string) {
    const fullPath = this.DOCUMENT_DIR + path;

    try {
      const contentString = await FileSystem.readAsStringAsync(fullPath);
      const content = JSON.parse(contentString);
      return content;
    } catch {
      return undefined;
    }
  }

  public static async documentFileExists(path: string): Promise<boolean> {
    const fullPath = this.DOCUMENT_DIR + path;

    try {
      const info = await FileSystem.getInfoAsync(fullPath);
      return info.exists;
    } catch {
      return false;
    }
  }

  public static async deleteDocumentFile(path: string) {
    const fullPath = this.DOCUMENT_DIR + path;

    try {
      await FileSystem.deleteAsync(fullPath);
    } catch {
      /* empty */
    }
  }

  public static async downloadDocument(downloadUri: string, fileUri: string) {
    const fullFileUri = this.DOCUMENT_DIR + fileUri;
    const { uri } = await FileSystem.downloadAsync(downloadUri, fullFileUri);
    return uri;
  }

  public static async readDocumentDir(path: string): Promise<FileInfo[]> {
    const fullPath = this.DOCUMENT_DIR + path;

    const fileURis = await FileSystem.readDirectoryAsync(fullPath);

    const requests: Promise<any>[] = [];

    fileURis.forEach((item) => {
      const fullFileUri = `${fullPath}/${item}`;
      requests.push(FileSystem.getInfoAsync(fullFileUri));
    });

    const files: FileInfo[] = (await Promise.all(requests)).filter(
      (item) => item.exists === true
    );

    return files;
  }
}
