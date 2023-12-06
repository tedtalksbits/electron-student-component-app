import { DeckType, DeckTypeWithAvgMastery } from '@/features/decks/types';
import connection from '../sql';
import { ServiceReturnType } from '../config/types/service';
import crudRepository from '../crudRepository';
import { RowDataPacket } from 'mysql2';

const DECK_TABLE = 'decks';

export const getDecks = async (): ServiceReturnType<DeckType[]> => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM ${DECK_TABLE} ORDER BY updated_at DESC`
    );
    return { data: rows as DeckType[], error: null };
  } catch (error) {
    const err = error as Error;
    return { error: err.message, data: null };
  }
};

export const createDeck = async (
  _event: Electron.IpcMainInvokeEvent,
  deck: DeckType,
  refetchQuery?: string
): ServiceReturnType<DeckType[]> => {
  try {
    await crudRepository.createOne(DECK_TABLE, deck);
    if (refetchQuery) {
      const [rows] = await connection.execute(refetchQuery);
      return { data: rows as DeckType[], error: null };
    }
    return { data: null, error: null };
  } catch (error) {
    const err = error as Error;
    return { error: err.message, data: null };
  }
};

export const deleteDeck = async (
  _event: Electron.IpcMainInvokeEvent,
  deckId: number,
  refetchQuery?: string
): ServiceReturnType<DeckType[]> => {
  try {
    await crudRepository.deleteOne(DECK_TABLE, deckId);
    await crudRepository.deleteMany('flashcards', { deck_id: deckId });
    if (refetchQuery) {
      const [rows] = await connection.execute(refetchQuery);
      return { data: rows as DeckType[], error: null };
    }
    return { data: null, error: null };
  } catch (error) {
    const err = error as Error;
    return { error: err.message, data: null };
  }
};

export const updateDeck = async (
  _event: Electron.IpcMainInvokeEvent,
  deckId: number,
  deck: DeckType,
  refetchQuery?: string
): ServiceReturnType<DeckType[]> => {
  try {
    await crudRepository.updateOne(DECK_TABLE, deckId, deck);
    if (refetchQuery) {
      const [rows] = await connection.execute(refetchQuery);
      return { data: rows as DeckType[], error: null };
    }
    return { data: null, error: null };
  } catch (error) {
    const err = error as Error;
    return { error: err.message, data: null };
  }
};

export const getDeckById = async (
  _event: Electron.IpcMainInvokeEvent,
  deckId: number
): ServiceReturnType<DeckType> => {
  try {
    const [rows] = await crudRepository.select('decks', ['*'], { id: deckId });
    return { data: rows as DeckType, error: null };
  } catch (error) {
    const err = error as Error;
    return { error: err.message, data: null };
  }
};

export const getLowestMasteredDecks = async (
  _event: Electron.IpcMainInvokeEvent,
  userId: number
): ServiceReturnType<DeckTypeWithAvgMastery[]> => {
  try {
    const [[rows]] = await connection.execute<RowDataPacket[]>(
      'CALL get_decks_by_mastery_avg(?)',
      [userId]
    );
    return { data: rows as DeckTypeWithAvgMastery[], error: null };
  } catch (error) {
    const err = error as Error;
    return { error: err.message, data: null };
  }
};
