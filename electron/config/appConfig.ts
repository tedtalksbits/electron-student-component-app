import fs from 'fs/promises';
import { projectDir } from '.';
export const defaultAppConfig: {
  theme: 'dark' | 'light';
  deckViewType: 'list' | 'grid';
} = {
  theme: 'dark',
  deckViewType: 'list',
};
export type AppConfig = typeof defaultAppConfig;
const appConfigPath = '/data/appConfig.json';
export async function setAppDefaultConfig() {
  // create data folder if it doesn't exist
  try {
    await fs.mkdir(`${projectDir}/data`);
  } catch (error) {
    console.error(error);
  }
  console.log('setAppDefaultConfig');
  // create file only if it doesn't exist
  try {
    await fs.writeFile(
      `${projectDir}${appConfigPath}`,
      JSON.stringify(defaultAppConfig, null, 2),
      { flag: 'wx' }
    );
  } catch (error) {
    console.error(error);
  }
}

export async function getAppConfig() {
  try {
    const appConfig = await fs.readFile(`${projectDir}${appConfigPath}`);
    return JSON.parse(appConfig.toString());
  } catch (error) {
    console.error(error);
    await setAppDefaultConfig();
    return defaultAppConfig;
  }
}

export async function setAppConfig(config: AppConfig) {
  try {
    await fs.writeFile(
      `${projectDir}${appConfigPath}`,
      JSON.stringify(config, null, 2)
    );
  } catch (error) {
    console.error(error);
  }
}
