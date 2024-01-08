export interface DownloadService<T> {
  download: (data: T[] | Partial<T>[], fileName: string) => void;
  downloadOne: (data: T | Partial<T>, fileName: string) => void;
}
