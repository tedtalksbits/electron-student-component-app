import { StudySession } from '@/features/study/types';

type ResponseData = {
  data: StudySession[];
  error?: string;
};

/**
 *
 * @param userId
 * @param setStudyAnalytics
 * @returns void
 *
 * @description
 * This function is used to get the study analytics of a user.
 * key: get-study-sessions, get-study-sessions-reply
 */
export function getStudyAnalytics(
  userId: number,
  setStudyAnalytics: React.Dispatch<React.SetStateAction<StudySession[]>>
) {
  window.electron.ipcRenderer.sendMessage('get-study-sessions', userId);

  window.electron.ipcRenderer.on('get-study-sessions-response', (arg) => {
    const response = arg as ResponseData;
    if (response.error) {
      alert(response.error);
      return;
    }

    setStudyAnalytics(response.data);
  });
}
