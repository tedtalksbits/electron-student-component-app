import { ipcMain } from 'electron';
import { USER_CHANNELS } from '../config/channels';
import { UserRepository } from './UserRepository';

export const userListeners = () => {
  const userRepository = new UserRepository();
  ipcMain.handle(
    USER_CHANNELS.GET_BY_ID,
    async (_event, ...args: Parameters<typeof userRepository.getOne>) => {
      return await userRepository.getOne(...args);
    }
  );

  ipcMain.handle(
    USER_CHANNELS.CREATE,
    async (_event, ...args: Parameters<typeof userRepository.createOne>) => {
      return await userRepository.createOne(...args);
    }
  );

  ipcMain.handle(
    USER_CHANNELS.DELETE,
    async (_event, ...args: Parameters<typeof userRepository.deleteOne>) => {
      return await userRepository.deleteOne(...args);
    }
  );

  ipcMain.handle(
    USER_CHANNELS.UPDATE,
    async (_event, ...args: Parameters<typeof userRepository.updateOne>) => {
      return await userRepository.updateOne(...args);
    }
  );

  ipcMain.handle(
    USER_CHANNELS.GET_LEVEL,
    async (
      _event,
      ...args: Parameters<typeof userRepository.getUserLevelAndXp>
    ) => {
      return await userRepository.getUserLevelAndXp(...args);
    }
  );

  ipcMain.handle(
    USER_CHANNELS.GET_XP_HISTORY,
    async (
      _event,
      ...args: Parameters<typeof userRepository.getUserXpHistory>
    ) => {
      return await userRepository.getUserXpHistory(...args);
    }
  );

  ipcMain.handle(
    USER_CHANNELS.UPDATE_XP,
    async (_event, ...args: Parameters<typeof userRepository.updateUserXp>) => {
      return await userRepository.updateUserXp(...args);
    }
  );
};
