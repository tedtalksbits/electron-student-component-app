import { ipcMain } from 'electron';
import { getAppConfig, setAppConfig } from './appConfig';
import { APP_CONFIG_CHANNELS } from './channels';

export const setUpAppConfigListeners = () => {
  ipcMain.handle(APP_CONFIG_CHANNELS.GET_CONFIG, async () => {
    const appConfig = await getAppConfig();
    return appConfig;
  });

  ipcMain.handle(APP_CONFIG_CHANNELS.SET_CONFIG, async (_event, config) => {
    await setAppConfig(config);
    return config;
  });
};
