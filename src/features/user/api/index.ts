import { userRepository } from '../../../../electron/user/UserRepository';

const getUserLevelAndXp = async (
  ...args: Parameters<typeof userRepository.getUserLevelAndXp>
) => await window.electron.ipcRenderer.user.getUserLevelAndXp(...args);

const getUserById = async (...args: Parameters<typeof userRepository.getOne>) =>
  await window.electron.ipcRenderer.user.getUserById(...args);

export const userApi = {
  getUserLevelAndXp,
  getUserById,
};
