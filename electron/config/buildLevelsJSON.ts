import { app, ipcMain } from 'electron';
import fs from 'fs/promises';
import path from 'path';
export interface Level {
  level: number;
  currentLevelXp: number;
  nextLevelXp: number;
}

const MAX_XP = 100000;
const BASE_XP = 1000;
const EXP = 0.5;

const projectDir = path.dirname(require.main?.filename ?? '');
const dataFolder = path.join(projectDir, 'levels.json');
function calculateNextLevelXp(baseXp: number, exponent: number, level: number) {
  // Use a dynamic exponent to increase the XP range with each level
  // increase level by 12%
  level = level * 1.12;
  exponent = exponent + level / 100;
  return Math.floor(baseXp * Math.pow(level, exponent));
}

function buildLevels(totalLevels: number, baseXp: number, exponent: number) {
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
  // const levels: Level[] = [];
  // let currentLevel = 1;
  // let currentLevelXp = 0;
  // let nextLevelXp = BASE_XP * Number(Math.pow(currentLevel, EXP).toFixed(0));
  // while (currentLevelXp < MAX_XP) {
  //   const level = {
  //     level: currentLevel,
  //     currentLevelXp,
  //     nextLevelXp,
  //   };
  //   levels.push(level);
  //   currentLevelXp = nextLevelXp;
  //   currentLevel++;
  //   nextLevelXp = BASE_XP * Number(Math.pow(currentLevel, EXP).toFixed(0));
  // }

  const levels = buildLevels(100, BASE_XP, EXP);

  const levelsJSON = JSON.stringify(levels, null, 2);

  console.log('levelsJSON', levelsJSON);
  console.log('dataFolder', dataFolder);

  try {
    // create file only if it doesn't exist
    await fs.writeFile(dataFolder, levelsJSON, { flag: 'wx' });
  } catch (error) {
    console.error(error);
  }
}
