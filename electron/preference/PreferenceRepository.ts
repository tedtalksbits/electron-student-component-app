import crudRepository from '../crudRepository';
import connection from '../sql';

type Preference = {
  id: number;
  user_id: number;
  theme: 'dark' | 'light';
  deck_view: 'list' | 'grid';
  max_cards_per_day: number;
  max_review_per_day: number;
  created_at: Date;
  updated_at: Date;
};
const PREFERENCE_TABLE = 'preferences';
export class PreferenceRepository {
  async getUserPreference(id: number | string) {
    try {
      const [data] = await crudRepository.select(PREFERENCE_TABLE, ['*'], {
        user_id: Number(id),
      });

      console.log('getUserPreference', data);

      return { data: data as Preference, error: null };
    } catch (error) {
      console.error(
        'an error occured while getting a preference, PreferenceRepository.getOne',
        error
      );
      const err = error as Error;
      return { error: err.message, data: null };
    }
  }
  async updateUserPreference(
    userId: number | string,
    preference: Partial<Preference>,
    refetchQuery?: string
  ) {
    try {
      console.log('updateUserPreference', userId, preference);
      await crudRepository.updateMany(PREFERENCE_TABLE, preference, {
        user_id: Number(userId),
      });
      if (refetchQuery) {
        const [rows] = await connection.execute(refetchQuery);
        return { data: rows as Preference[], error: null };
      }
      return {
        data: null,
        error: null,
      };
    } catch (error) {
      console.error(
        'an error occured while updating a preference, PreferenceRepository.updateOne',
        error
      );
      const err = error as Error;
      return { error: err.message, data: null };
    }
  }
}

export const preferenceRepository = new PreferenceRepository();
