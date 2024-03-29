export const DECK_CHANNELS = {
  GET_BY_AVG_MASTERY: 'GET_BY_AVG_MASTERY',
  GET: 'GET_DECKS',
  CREATE: 'CREATE_DECK',
  CREATE_MANY: 'CREATE_MANY_DECKS',
  DELETE: 'DELETE_DECK',
  UPDATE: 'UPDATE_DECK',
  GET_BY_ID: 'GET_DECK_BY_ID',
  GET_LAST_STUDIED: 'GET_LAST_STUDIED_DECK',
};
export const APP_CONFIG_CHANNELS = {
  GET_CONFIG: 'get-app-config',
  SET_CONFIG: 'set-app-config',
};

export const FLASHCARD_CHANNELS = {
  GET_BY_DECK_ID: 'GET_FLASHCARDS_BY_DECK_ID',
  CREATE: 'CREATE_FLASHCARD',
  CREATE_MANY: 'CREATE_MANY_FLASHCARDS',
  DELETE: 'DELETE_FLASHCARD',
  UPDATE: 'UPDATE_FLASHCARD',
  GET_RANDOM: 'GET_RANDOM_FLASHCARDS',
};

export const USER_CHANNELS = {
  GET_BY_ID: 'GET_USER_BY_ID',
  CREATE: 'CREATE_USER',
  DELETE: 'DELETE_USER',
  UPDATE: 'UPDATE_USER',
  GET_LEVEL: 'GET_USER_LEVEL',
  GET_XP_HISTORY: 'GET_USER_XP_HISTORY',
  UPDATE_XP: 'UPDATE_USER_XP',
};

export const PREFERENCE_CHANNELS = {
  GET_PREFERENCE: 'GET_PREFERENCE',
  SET_PREFERENCE: 'SET_PREFERENCE',
};

export const SYSTEM_CHANNELS = {
  DOWNLOAD_JSON: 'download-json',
  DOWNLOAD_CSV: 'download-csv',
};
