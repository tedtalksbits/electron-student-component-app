import { ipcMain } from 'electron';
import { DECK_CHANNELS } from '../config/channels';
import {
  createDeck,
  deleteDeck,
  getDeckById,
  getDecks,
  getLowestMasteredDecks,
  updateDeck,
  createDecks,
  getLastStudiedDeck,
} from './deckServices';

export const deckListeners = () => {
  ipcMain.handle(DECK_CHANNELS.GET, getDecks);
  ipcMain.handle(DECK_CHANNELS.CREATE, createDeck);
  ipcMain.handle(DECK_CHANNELS.CREATE_MANY, createDecks);
  ipcMain.handle(DECK_CHANNELS.DELETE, deleteDeck);
  ipcMain.handle(DECK_CHANNELS.UPDATE, updateDeck);
  ipcMain.handle(DECK_CHANNELS.GET_BY_ID, getDeckById);
  ipcMain.handle(DECK_CHANNELS.GET_BY_AVG_MASTERY, getLowestMasteredDecks);
  ipcMain.handle(DECK_CHANNELS.GET_LAST_STUDIED, getLastStudiedDeck);
};
