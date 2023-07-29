import { EndStudySession, StartStudySession, StudySession } from '../types';

type ResponseData = {
  sessionId: number;
  error?: string;
};
/**
 *
 * @param data
 * @param refetchQuery - string: SQL query to refetch data after mutation
 * @param callback - function: callback function to run after mutation
 * @returns void
 * This function is used to add a study session.
 *
 * keys: 'add-study-session' and 'add-study-session-response'
 *
 */

export function addStudySession(
  data: StartStudySession,
  callback: (sessionId: number) => void,
  refetchQuery?: string
) {
  window.electron.ipcRenderer.sendMessage(
    'add-study-session',
    data,
    refetchQuery
  );
  window.electron.ipcRenderer.once('add-study-session-response', (args) => {
    const response = args as ResponseData;
    if (response.error) {
      alert(response.error);
      return;
    }

    callback(response.sessionId);
  });
}

/**
 * @param data
 * @param refetchQuery - string: SQL query to refetch data after mutation
 * @param callback - function: callback function to run after mutation
 * @returns void
 * This function is used to update a study session.
 *
 * keys: 'update-study-session' and 'update-study-session-response'
 */

type UpdateStudySessionResponse = {
  data: StudySession;
  error?: string;
};

export function updateStudySession(
  data: EndStudySession,
  id: number,
  callback: (data: StudySession) => void,
  refetchQuery?: string
) {
  window.electron.ipcRenderer.sendMessage(
    'update-study-session',
    data,
    id,
    refetchQuery
  );
  window.electron.ipcRenderer.once('update-study-session-response', (args) => {
    const response = args as UpdateStudySessionResponse;
    if (response.error) {
      alert(response.error);
      return;
    }

    callback(response.data);
  });
}
