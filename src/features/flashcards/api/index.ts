import { flashcardRepository } from '../../../../electron/flashcard/flashcardServices';

const getFlashcardsByDeckId = async (
  ...args: Parameters<typeof flashcardRepository.getFlashcardsByDeckId>
) => await window.electron.ipcRenderer.flashcard.getFlashcardsByDeckId(...args);

const createFlashcard = async (
  ...args: Parameters<typeof flashcardRepository.createOne>
) => await window.electron.ipcRenderer.flashcard.createFlashcard(...args);

const createFlashcards = async (
  ...args: Parameters<typeof flashcardRepository.createMany>
) => await window.electron.ipcRenderer.flashcard.createFlashcards(...args);

const updateFlashcard = async (
  ...args: Parameters<typeof flashcardRepository.updateOne>
) => await window.electron.ipcRenderer.flashcard.updateFlashcard(...args);

const deleteFlashcard = async (
  ...args: Parameters<typeof flashcardRepository.deleteOne>
) => await window.electron.ipcRenderer.flashcard.deleteFlashcard(...args);

const getRandomFlashcards = async (deckId: number, limit = 100) =>
  window.electron.ipcRenderer.flashcard.getRandomFlashcards(deckId, limit);

export const flashcardApi = {
  getFlashcardsByDeckId,
  createFlashcard,
  updateFlashcard,
  deleteFlashcard,
  getRandomFlashcards,
  createFlashcards,
};
