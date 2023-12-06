import { FlashcardType } from '@/features/flashcards/types';
import { CRUDRepository } from '../repository/Repository';
import connection from '../sql';
import crudRepository from '../crudRepository';
const FLASHCARDTABLE = 'flashcards';

export class FlashcardRepository
  implements CRUDRepository<FlashcardType, number>
{
  async createOne(data: Partial<FlashcardType>, refetchQuery?: string) {
    try {
      await crudRepository.createOne(`${FLASHCARDTABLE}`, data);
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
  }
  async deleteOne(id: number, refetchQuery?: string | undefined) {
    try {
      await crudRepository.deleteOne(`${FLASHCARDTABLE}`, id);
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
  }
  async updateOne(
    id: number,
    data: Partial<FlashcardType>,
    refetchQuery?: string | undefined
  ) {
    try {
      await crudRepository.updateOne(`${FLASHCARDTABLE}`, id, data);
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
  }
  async getOne(id: number) {
    try {
      const [rows] = await connection.execute(
        `SELECT * FROM ${FLASHCARDTABLE} WHERE id = ${id}`
      );
      return { data: rows as FlashcardType[], error: null };
    } catch (error) {
      const err = error as Error;
      return { error: err.message, data: null };
    }
  }
  async getAll() {
    try {
      const [rows] = await connection.execute(
        `SELECT * FROM ${FLASHCARDTABLE} ORDER BY updated_at DESC`
      );
      return { data: rows as FlashcardType[], error: null };
    } catch (error) {
      const err = error as Error;
      return { error: err.message, data: null };
    }
  }
  async deleteMany(where: Partial<FlashcardType>) {
    try {
      await crudRepository.deleteMany(FLASHCARDTABLE, where);
      return { data: null, error: null };
    } catch (error) {
      const err = error as Error;
      return { error: err.message, data: null };
    }
  }
  async createMany(data: Partial<FlashcardType>[]) {
    try {
      await crudRepository.insertMany(FLASHCARDTABLE, data);
      return { data: null, error: null };
    } catch (error) {
      const err = error as Error;
      return { error: err.message, data: null };
    }
  }
  async getFlashcardsByDeckId(deckId: number) {
    try {
      const [rows] = await connection.execute(
        `SELECT * FROM ${FLASHCARDTABLE} WHERE deck_id = ${deckId} ORDER BY updated_at ASC`
      );
      return { data: rows as FlashcardType[], error: null };
    } catch (error) {
      const err = error as Error;
      return { error: err.message, data: null };
    }
  }
  async getRandomFlashcardsByDeckId(deckId: number, limit = 100) {
    try {
      const [rows] = await connection.execute(
        `SELECT * FROM ${FLASHCARDTABLE} WHERE deck_id = ${deckId} ORDER BY RAND() LIMIT ${limit}`
      );
      return { data: rows as FlashcardType[], error: null };
    } catch (error) {
      const err = error as Error;
      return { error: err.message, data: null };
    }
  }
}
