import { ipcMain } from 'electron';
import { FLASHCARD_CHANNELS } from '../config/channels/index';
import {
  createFlashcard,
  createFlashcards,
  deleteFlashcard,
  getFlashcardsByDeckId,
  getRandomFlashcards,
  updateFlashcard,
} from './flashcardServices';

export const flashcardListeners = () => {
  ipcMain.handle(FLASHCARD_CHANNELS.GET_BY_DECK_ID, getFlashcardsByDeckId);
  ipcMain.handle(FLASHCARD_CHANNELS.CREATE, createFlashcard);
  ipcMain.handle(FLASHCARD_CHANNELS.CREATE_MANY, createFlashcards);
  ipcMain.handle(FLASHCARD_CHANNELS.DELETE, deleteFlashcard);
  ipcMain.handle(FLASHCARD_CHANNELS.UPDATE, updateFlashcard);
  ipcMain.handle(FLASHCARD_CHANNELS.GET_RANDOM, getRandomFlashcards);
};

export type GetArgs = [deckId: number, limit?: number];
