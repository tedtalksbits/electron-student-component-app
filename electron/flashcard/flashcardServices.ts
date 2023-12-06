import { FlashcardDTO, FlashcardType } from '@/features/flashcards/types';
import crudRepository from '../crudRepository';
import connection from '../sql';
import { FlashcardServices } from './types';
const FLASHCARDTABLE = 'flashcards';

export const getFlashcardsByDeckId: FlashcardServices['getFlashcardsByDeckId'] =
  async (_event: Electron.IpcMainInvokeEvent, deckId: number) => {
    console.log('get-flashcards-by-deckId', deckId);
    try {
      const [rows] = await connection.execute(
        `SELECT * FROM ${FLASHCARDTABLE} WHERE deck_id = ${deckId} ORDER BY updated_at ASC`
      );
      return { data: rows as FlashcardType[], error: null };
    } catch (error) {
      const err = error as Error;
      return { error: err.message, data: null };
    }
  };

export const createFlashcard: FlashcardServices['createFlashcard'] = async (
  _event: Electron.IpcMainInvokeEvent,
  flashcard: Partial<FlashcardDTO>,
  refetchQuery?: string
) => {
  console.log('create-flashcard', flashcard);
  try {
    await crudRepository.createOne(`${FLASHCARDTABLE}`, flashcard);
    if (refetchQuery) {
      const [rows] = await connection.execute(refetchQuery);
      return { data: rows as FlashcardType[], error: null };
    }
    return {
      data: null,
      error: null,
    };
  } catch (error) {
    const err = error as Error;
    return { error: err.message, data: null };
  }
};

export const deleteFlashcard: FlashcardServices['deleteFlashcard'] = async (
  _event: Electron.IpcMainInvokeEvent,
  flashcardId: number,
  refetchQuery?: string
) => {
  console.log('delete-flashcard', flashcardId);
  try {
    await crudRepository.deleteOne(`${FLASHCARDTABLE}`, flashcardId);
    if (refetchQuery) {
      const [rows] = await connection.execute(refetchQuery);
      return { data: rows as FlashcardType[], error: null };
    }
    return {
      data: null,
      error: null,
    };
  } catch (error) {
    const err = error as Error;
    return { error: err.message, data: null };
  }
};

export const updateFlashcard: FlashcardServices['updateFlashcard'] = async (
  _event: Electron.IpcMainInvokeEvent,
  flashcardId: number,
  data: Partial<FlashcardDTO>,
  refetchQuery?: string
) => {
  console.log('update-flashcard', data);
  try {
    await crudRepository.updateOne(`${FLASHCARDTABLE}`, flashcardId, data);
    if (refetchQuery) {
      const [rows] = await connection.execute(refetchQuery);
      return { data: rows as FlashcardType[], error: null };
    }
    return {
      data: null,
      error: null,
    };
  } catch (error) {
    const err = error as Error;
    return { error: err.message, data: null };
  }
};

export const getRandomFlashcards: FlashcardServices['getRandomFlashcards'] =
  async (_event: Electron.IpcMainInvokeEvent, deckId: number) => {
    console.log('get-random-flashcards', deckId);
    try {
      const [rows] = await connection.execute(
        `SELECT * FROM ${FLASHCARDTABLE} WHERE deck_id = ${deckId} ORDER BY RAND()`
      );
      return { data: rows as FlashcardType[], error: null };
    } catch (error) {
      const err = error as Error;
      return { error: err.message, data: null };
    }
  };
