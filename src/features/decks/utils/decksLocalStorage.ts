// we will store recent uploaded files in local storage using the file name as the key and the file content (which is of type DeckType) as the value
const KEY = 'DeckRecentFiles';
export const getRecentFiles = <T>() => {
  const recentFilesStr = localStorage.getItem(KEY);
  if (!recentFilesStr) return null;
  return JSON.parse(recentFilesStr) as RecentFile<T>[];
};

type RecentFile<T> = {
  fileName: string;
  data: Partial<T>[];
};
export const appendRecentFile = <T extends object>(data: RecentFile<T>) => {
  const recentFiles = getRecentFiles();
  if (recentFiles) {
    const updatedRecentFiles = [data, ...recentFiles];
    localStorage.setItem(KEY, JSON.stringify(updatedRecentFiles));
  } else {
    localStorage.setItem(KEY, JSON.stringify([data]));
  }
};
