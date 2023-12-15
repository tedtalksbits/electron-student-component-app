import { User, UserLevel } from '@/features/user/types';
import { CRUDRepository } from '../repository/Repository';
import crudRepository from '../crudRepository';
import connection from '../sql';
import { RowDataPacket } from 'mysql2';

const USERTABLE = 'users';

export class UserRepository implements CRUDRepository<User, number | string> {
  async createOne(user: Partial<User>, refetchQuery?: string) {
    try {
      await crudRepository.createOne(`${USERTABLE}`, user);
      if (refetchQuery) {
        const [rows] = await connection.execute(refetchQuery);
        return { data: rows as User[], error: null };
      }
      return {
        data: null,
        error: null,
      };
    } catch (error) {
      console.error(
        'an error occured while creating a user, UserRepository.createOne',
        error
      );
      const err = error as Error;
      return { error: err.message, data: null };
    }
  }
  async deleteOne(id: number | string, refetchQuery?: string | undefined) {
    try {
      await crudRepository.deleteOne(`${USERTABLE}`, Number(id));
      if (refetchQuery) {
        const [rows] = await connection.execute<RowDataPacket[]>(refetchQuery);
        return { data: rows as User[], error: null };
      }
      return {
        data: null,
        error: null,
      };
    } catch (error) {
      console.error(
        'an error occured while deleting a user, UserRepository.deleteOne',
        error
      );
      const err = error as Error;
      return { error: err.message, data: null };
    }
  }
  async getOne(id: number | string) {
    try {
      const [rows] = await crudRepository.select(`${USERTABLE}`, ['*'], {
        id: Number(id),
      });
      return { data: rows as User, error: null };
    } catch (error) {
      console.error(
        'an error occured while getting a user, UserRepository.getOne',
        error
      );
      const err = error as Error;
      return { error: err.message, data: null };
    }
  }

  async updateOne(
    id: number | string,
    user: Partial<User>,
    refetchQuery?: string | undefined
  ) {
    try {
      await crudRepository.updateOne(`${USERTABLE}`, Number(id), user);
      if (refetchQuery) {
        const [rows] = await connection.execute(refetchQuery);
        return { data: rows as User[], error: null };
      }
      return {
        data: null,
        error: null,
      };
    } catch (error) {
      console.error(
        'an error occured while updating a user, UserRepository.updateOne',
        error
      );
      const err = error as Error;
      return { error: err.message, data: null };
    }
  }

  async getUserLevelAndXp(
    id: number | string
  ): Promise<{ data: UserLevel | null; error: string | null }> {
    try {
      const [userLevel] = await connection.execute<RowDataPacket[]>(
        `SELECT
        users.total_xp,
        levels.level,
        levels.current_level_xp,
        levels.next_level_xp 
        FROM users
        INNER JOIN levels ON users.level = levels.level
        WHERE users.id = ${id}`
      );
      return { data: userLevel[0] as UserLevel, error: null };
    } catch (error) {
      console.error(
        'an error occured while getting a user level and xp, UserRepository.getUserLevelAndXp',
        error
      );
      const err = error as Error;
      return { error: err.message, data: null };
    }
  }
}

export const userRepository = new UserRepository();
