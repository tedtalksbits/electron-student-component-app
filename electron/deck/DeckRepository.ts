import { DeckType, DeckTypeWithAvgMastery } from '@/features/decks/types';
import { CRUDRepository } from '../repository/Repository';
import crudRepository from '../crudRepository';
import connection from '../sql';
import { RowDataPacket } from 'mysql2';
const DECK_TABLE = 'decks';
export class DeckRespository implements CRUDRepository<DeckType, number> {
  async createOne(data: Partial<DeckType>, refetchQuery?: string) {
    try {
      await crudRepository.createOne(DECK_TABLE, data);
      if (refetchQuery) {
        const [rows] = await connection.execute(refetchQuery);
        return { data: rows as DeckType[], error: null };
      }
      return { data: null, error: null };
    } catch (error) {
      const err = error as Error;
      return { error: err.message, data: null };
    }
  }
  async deleteOne(id: number, refetchQuery?: string) {
    try {
      await crudRepository.deleteOne(DECK_TABLE, id);
      await crudRepository.deleteMany('flashcards', { deck_id: id });
      if (refetchQuery) {
        const [rows] = await connection.execute(refetchQuery);
        return { data: rows as DeckType[], error: null };
      }
      return { data: null, error: null };
    } catch (error) {
      const err = error as Error;
      return { error: err.message, data: null };
    }
  }
  async updateOne(
    id: number,
    data: Partial<DeckType>,
    refetchQuery: string | undefined
  ) {
    try {
      await crudRepository.updateOne(DECK_TABLE, id, data);
      if (refetchQuery) {
        const [rows] = await connection.execute(refetchQuery);
        return { data: rows as DeckType[], error: null };
      }
      return { data: null, error: null };
    } catch (error) {
      const err = error as Error;
      return { error: err.message, data: null };
    }
  }
  async getOne(id: number) {
    try {
      const [rows] = await crudRepository.select(DECK_TABLE, ['*'], { id });
      return { data: rows as DeckType, error: null };
    } catch (error) {
      const err = error as Error;
      return { error: err.message, data: null };
    }
  }
  async getAll() {
    try {
      const [rows] = await connection.execute(
        'SELECT * FROM decks ORDER BY updated_at DESC'
      );
      return { data: rows as DeckType[], error: null };
    } catch (error) {
      const err = error as Error;
      return { error: err.message, data: null };
    }
  }

  async getByLowestMastered(userId: string | number) {
    try {
      const [[rows]] = await connection.execute<RowDataPacket[]>(
        'CALL get_decks_by_mastery_avg(?)',
        [userId]
      );
      console.log(
        '******************************************************* ROWS*****************************************************',
        rows
      );
      return { data: rows as DeckTypeWithAvgMastery[], error: null };
    } catch (error) {
      const err = error as Error;
      return { error: err.message, data: null };
    }
  }
}
