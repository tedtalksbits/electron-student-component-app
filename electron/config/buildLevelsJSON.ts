import fs from 'fs/promises';
import path from 'path';
import { projectDir } from '.';
export interface Level {
  level: number;
  currentLevelXp: number;
  nextLevelXp: number;
}

const BASE_XP = 1000;
const EXP = 0.5;

const dataFolder = path.join(projectDir, 'levels.json');
function calculateNextLevelXp(baseXp: number, exponent: number, level: number) {
  // Use a dynamic exponent to increase the XP range with each level
  // increase level by 12%
  level = level * 1.12;
  exponent = exponent + level / 100;
  return Math.floor(baseXp * Math.pow(level, exponent));
}

export function buildLevels(
  totalLevels: number,
  baseXp: number,
  exponent: number
) {
  const levels = [] as Level[];

  for (let level = 1; level <= totalLevels; level++) {
    const currentLevelXp =
      levels.length === 0 ? 0 : levels[level - 2].nextLevelXp;
    const nextLevelXp = calculateNextLevelXp(baseXp, exponent, level);

    const levelInfo = {
      level: level,
      currentLevelXp: currentLevelXp,
      nextLevelXp: nextLevelXp,
    };

    levels.push(levelInfo);
  }

  return levels;
}

export async function buildLevelsJSON() {
  const levels = buildLevels(100, BASE_XP, EXP);

  const levelsJSON = JSON.stringify(levels, null, 2);
  try {
    // create file only if it doesn't exist
    await fs.writeFile(dataFolder, levelsJSON, { flag: 'wx' });
  } catch (error) {
    // console.error(error);
  }
}
