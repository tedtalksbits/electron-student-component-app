import { StudySession } from '@/features/study/types';
import { DailyStudyAnalytics } from '../components/MostStudied';

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
    console.log('response get study session', response.data);
    setStudyAnalytics(response.data);
  });
}

/**
 * @param userId
 * @param setStudyDailyAnalytics
 * @returns void
 * @description
 * This function is used to get the daily study analytics of a user.
 * key: get-flashcards-studied-daily, get-flashcards-studied-daily-response
 * */

export function getDailyStudyAnalytics(
  userId: number,
  setStudyDailyAnalytics: React.Dispatch<
    React.SetStateAction<DailyStudyAnalytics[]>
  >
) {
  window.electron.ipcRenderer.sendMessage(
    'get-flashcards-studied-daily',
    userId
  );

  window.electron.ipcRenderer.on(
    'get-flashcards-studied-daily-response',
    (arg) => {
      const response = arg as {
        data: DailyStudyAnalytics[];
        error?: string;
      };
      if (response.error) {
        alert(response.error);
        return;
      }
      console.log('response get daily study session', response.data);
      setStudyDailyAnalytics(response.data);
    }
  );
}
