import { ipcMain } from 'electron';
import { PREFERENCE_CHANNELS } from '../config/channels';
import { preferenceRepository } from './PreferenceRepository';

export const userPreferenceListeners = () => {
  ipcMain.handle(
    PREFERENCE_CHANNELS.GET_PREFERENCE,
    async (
      _event,
      ...args: Parameters<typeof preferenceRepository.getUserPreference>
    ) => await preferenceRepository.getUserPreference(...args)
  );
  ipcMain.handle(
    PREFERENCE_CHANNELS.SET_PREFERENCE,
    async (
      _event,
      ...args: Parameters<typeof preferenceRepository.updateUserPreference>
    ) => await preferenceRepository.updateUserPreference(...args)
  );
};
