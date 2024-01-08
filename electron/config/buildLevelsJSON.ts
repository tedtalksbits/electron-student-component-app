import fs from 'fs/promises';
import path from 'path';
import { projectDir } from '.';
export interface Level {
  level: number;
  currentLevelXp: number;
  nextLevelXp: number;
}

const dataFolder = path.join(projectDir, 'levels.json');

export function buildLevels(
  num_levels: number,
  base_xp = 1500,
  xp_increment = 1700
) {
  const levels: Level[] = [];
  let min_xp = 0;
  for (let level = 1; level <= num_levels; level++) {
    levels.push({
      level,
      currentLevelXp: min_xp,
      nextLevelXp: min_xp + base_xp,
    });
    min_xp += base_xp;
    base_xp += xp_increment;
  }
  return levels;
}

export async function buildLevelsJSON() {
  const levels = buildLevels(100);

  const levelsJSON = JSON.stringify(levels, null, 2);
  try {
    // create file only if it doesn't exist
    await fs.writeFile(dataFolder, levelsJSON, { flag: 'wx' });
  } catch (error) {
    // console.error(error);
  }
}
