import { RowDataPacket } from 'mysql2';
import { dbConfig } from '.';
import connection from '../sql';
import { buildLevels } from './buildLevelsJSON';

/*
  ========================================
  CREATE NECCESSARY TABLES IN DATABASE
  ========================================
*/

// create levels table

export const createLevelsTable = async () => {
  console.log('createLevelsTable');
  const sql = `
    CREATE TABLE IF NOT EXISTS levels (
      level INTEGER NOT NULL PRIMARY KEY,
      current_level_xp INTEGER NOT NULL DEFAULT 0,
      next_level_xp INTEGER NOT NULL DEFAULT 0
    )
  `;
  try {
    await connection.query(sql);
    await createGetLevelByXpStoredProc();
  } catch (error) {
    console.error(error);
  }
};

export const createLevels = async () => {
  console.log('createLevels');
  const BASE_XP = 1000;
  const EXP = 0.5;
  const MAX_LEVEL = 100;

  const levels = buildLevels(MAX_LEVEL, BASE_XP, EXP);

  // check if levels table is empty
  const checkLevelsTableSQL = `
    SELECT * FROM levels
  `;
  try {
    const [res] = await connection.execute<RowDataPacket[]>(
      checkLevelsTableSQL
    );
    console.log('levels table', res);
    if (res.length > 0) {
      console.log('levels table already has data');
      return;
    }
  } catch (error) {
    console.error('there was an error in createLevels()', error);
  }

  const sql = `
    INSERT INTO levels (level, current_level_xp, next_level_xp)
    VALUES (?, ?, ?)
  `;

  try {
    for (const level of levels) {
      await connection.query(sql, [
        level.level,
        level.currentLevelXp,
        level.nextLevelXp,
      ]);
    }
  } catch (error) {
    console.error(
      'there was an error in createLevels() while inserting levels',
      error
    );
  }
};

export const createGetLevelByXpStoredProc = async () => {
  console.log('createGetLevelByXpStoredProc');
  // check if stored procedure exists
  const db = dbConfig.database;
  const sql1 = `
    SELECT * FROM INFORMATION_SCHEMA.ROUTINES
    WHERE ROUTINE_SCHEMA = '${db}' AND ROUTINE_NAME = 'get_level_by_xp'
  `;

  try {
    const [res] = await connection.execute<RowDataPacket[]>(sql1);

    if (res.length > 0) {
      console.log('stored procedure already exists');
      return;
    }
  } catch (error) {
    console.error(
      'there was an error in createGetLevelByXpStoredProc()',
      error
    );
  }

  const sql2 = `
    CREATE PROCEDURE get_level_by_xp(IN xp INT)
    BEGIN
      SELECT * FROM levels WHERE xp >= current_level_xp AND xp < next_level_xp;
    END
  `;

  try {
    await connection.query(sql2);
  } catch (error) {
    console.error(error);
  }
};
