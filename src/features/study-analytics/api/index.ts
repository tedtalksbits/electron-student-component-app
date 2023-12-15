import { StudySession } from '@/features/study/types';
import {
  DailyStudyAnalytics,
  LastStudySession,
  MostStudiedDeck,
  TotalStudyAnalytics,
} from '../types';

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

/**
 * @param userId
 * @param callback
 * @returns void
 * @description
 * This function is used to get the daily study analytics of a user.
 * key: get-flashcards-studied-daily, get-flashcards-studied-daily-response
 * */

export function getDailyStudyAnalytics(
  userId: number,
  callback: (data: DailyStudyAnalytics[]) => void
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
      const dataWithDatesAsString = response.data.map((task) => {
        return {
          ...task,
          study_date: task.study_date?.toString(),
        };
      });
      callback(dataWithDatesAsString);
    }
  );
}

/**
 * @param userId
 * @param callback
 * @returns void
 * @description
 * This function is used to get most studied decks of a user.
 * key: get-most-studied-decks, get-most-studied-decks-response
 *
 * */

export function getMostStudiedDecks(
  userId: number,
  callback: (data: MostStudiedDeck[]) => void
) {
  window.electron.ipcRenderer.sendMessage('get-most-studied-decks', userId);

  window.electron.ipcRenderer.on('get-most-studied-decks-response', (arg) => {
    const response = arg as {
      data: MostStudiedDeck[];
      error?: string;
    };
    if (response.error) {
      alert(response.error);
      return;
    }

    const dataWithDatesAsString = response.data.map((task) => {
      return {
        ...task,
        created_at: task.created_at?.toString(),
        updated_at: task.updated_at?.toString(),
      };
    });
    callback(dataWithDatesAsString);
  });
}

/**
 * @param userId
 * @param callback
 * @returns void
 * @description
 * This function is used to get the last study session + deck of a user.
 * key: get-last-studied-deck, get-last-studied-deck-response
 * */

export function getLastStudiedDeck(
  userId: number,
  callback: (data: LastStudySession[]) => void
) {
  window.electron.ipcRenderer.sendMessage('get-last-studied-deck', userId);

  window.electron.ipcRenderer.on('get-last-studied-deck-response', (arg) => {
    const response = arg as {
      data: LastStudySession[];
      error?: string;
    };
    if (response.error) {
      alert(response.error);
      return;
    }

    const dataWithDatesAsString = response.data.map((task) => {
      return {
        ...task,
        created_at: task.created_at?.toString(),
        updated_at: task.updated_at?.toString(),
        end_time: task.end_time?.toString(),
        start_time: task.start_time?.toString(),
      };
    });
    callback(dataWithDatesAsString);
  });
}

/**
 * @param userId
 * @param callback
 * @returns void
 * @description
 * This function is used to get the totals for analytical data points.
 * key: get-total-analytics, get-total-analytics-response
 * */

export function getTotalAnalytics(
  userId: number,
  callback: (data: TotalStudyAnalytics[]) => void
) {
  window.electron.ipcRenderer.sendMessage('get-total-analytics', userId);

  window.electron.ipcRenderer.on('get-total-analytics-response', (arg) => {
    const response = arg as {
      data: TotalStudyAnalytics[];
      error?: string;
    };
    if (response.error) {
      alert(response.error);
      return;
    }

    callback(response.data);
  });
}
