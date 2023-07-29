export const setSessionId = (sessionId: string) => {
  window.localStorage.setItem('sessionId', sessionId);
};

export const getSessionId = () => {
  return window.localStorage.getItem('sessionId');
};
