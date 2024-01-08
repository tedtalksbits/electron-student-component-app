import { ipcMain } from 'electron';
import { downloadAsCsv, downloadAsJson } from './systemRepository';

export const systemListeners = () => {
  // download deck as json
  ipcMain.handle(
    'download-json',
    async (_event, ...args: Parameters<typeof downloadAsJson>) =>
      downloadAsJson(...args)
  );

  // download deck as csv
  ipcMain.handle(
    'download-csv',
    async (_event, ...args: Parameters<typeof downloadAsCsv>) =>
      downloadAsCsv(...args)
  );
};
