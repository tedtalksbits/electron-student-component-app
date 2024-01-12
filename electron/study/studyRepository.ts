import { StudySession } from '@/features/study/types';
import { CRUDRepository } from '../repository/Repository';
import crudRepository from '../crudRepository';

const STUDY_TABLE = 'study_sessions';

export class StudyRepository
  implements CRUDRepository<StudySession, number | string>
{
  async createOne(data: Partial<StudySession>) {
    try {
      await crudRepository.createOne(STUDY_TABLE, data);
      return { data: null, error: null };
    } catch (error) {
      const err = error as Error;
      return { error: err.message, data: null };
    }
  }
  async createMany(data: Partial<StudySession>[]) {
    try {
      await crudRepository.insertMany(STUDY_TABLE, data);
      return { data: null, error: null };
    } catch (error) {
      const err = error as Error;
      return { error: err.message, data: null };
    }
  }
  async deleteOne(id: number | string) {
    try {
      await crudRepository.deleteOne(STUDY_TABLE, Number(id));
      return { data: null, error: null };
    } catch (error) {
      const err = error as Error;
      return { error: err.message, data: null };
    }
  }
  async updateOne(id: number | string, data: Partial<StudySession>) {
    try {
      await crudRepository.updateOne(STUDY_TABLE, Number(id), data);
      return { data: null, error: null };
    } catch (error) {
      const err = error as Error;
      return { error: err.message, data: null };
    }
  }
  async getOne(id: number | string) {
    try {
      const [rows] = await crudRepository.select(STUDY_TABLE, ['*'], { id });
      return { data: rows as StudySession, error: null };
    } catch (error) {
      const err = error as Error;
      return { error: err.message, data: null };
    }
  }
  async getMany(query: Partial<StudySession>) {
    try {
      const rows = await crudRepository.select(STUDY_TABLE, ['*'], query);
      return { data: rows as StudySession[], error: null };
    } catch (error) {
      const err = error as Error;
      return { error: err.message, data: null };
    }
  }

  async getManyByDeckId(deckId: number) {
    return this.getMany({ deck_id: deckId });
  }
}

const studyRepository = new StudyRepository();

export default studyRepository;
