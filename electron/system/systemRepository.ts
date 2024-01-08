import { dialog } from 'electron';
import fs from 'fs/promises';

// generic download as json function
export const downloadAsJson = async <T>(data: T, name: string) => {
  const options = {
    defaultPath: `${name}.json`,
    filters: [{ name: 'JSON', extensions: ['json'] }],
  };
  const { filePath } = await dialog.showSaveDialog(options);
  if (filePath) {
    try {
      await fs.writeFile(filePath, JSON.stringify(data));
      return { error: null };
    } catch (error) {
      const err = error as Error;
      return { error: err.message };
    }
  }
};

// generic download as csv function
export const downloadAsCsv = async <T extends []>(data: T, name: string) => {
  const options = {
    defaultPath: `${name}.csv`,
    filters: [{ name: 'CSV', extensions: ['csv'] }],
  };
  const { filePath } = await dialog.showSaveDialog(options);
  // convert data to csv

  const csvData = data.map((d: any) => jsObjectToCsvRow(d)).join('\n');

  if (filePath) {
    try {
      await fs.writeFile(filePath, csvData);
      return { error: null };
    } catch (error) {
      const err = error as Error;
      return { error: err.message };
    }
  }
};

function jsObjectToCsvRow(data: any) {
  const dataArray = [];
  for (const o in data) {
    dataArray.push(data[o]);
  }
  return dataArray.join(',');
}
