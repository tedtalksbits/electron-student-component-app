import { FlashcardRepository } from './FlashcardRepository';

export const flashcardRepository = new FlashcardRepository();

export const getFlashcardsByDeckId = async (
  _event: Electron.IpcMainInvokeEvent,
  ...args: Parameters<typeof flashcardRepository.getFlashcardsByDeckId>
) => flashcardRepository.getFlashcardsByDeckId(...args);

export const createFlashcard = async (
  _event: Electron.IpcMainInvokeEvent,
  ...args: Parameters<typeof flashcardRepository.createOne>
) => flashcardRepository.createOne(...args);

export const deleteFlashcard = async (
  _event: Electron.IpcMainInvokeEvent,
  ...args: Parameters<typeof flashcardRepository.deleteOne>
) => flashcardRepository.deleteOne(...args);

export const updateFlashcard = async (
  _event: Electron.IpcMainInvokeEvent,
  ...args: Parameters<typeof flashcardRepository.updateOne>
) => flashcardRepository.updateOne(...args);

export const getRandomFlashcards = async (
  _event: Electron.IpcMainInvokeEvent,
  ...args: Parameters<typeof flashcardRepository.getRandomFlashcardsByDeckId>
) => flashcardRepository.getRandomFlashcardsByDeckId(...args);
