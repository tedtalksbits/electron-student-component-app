import {
  DailyStudyAnalytics,
  StudyAnalyticsState,
  TotalStudyAnalytics,
} from '@/features/study-analytics/types';
import { icons } from './icons';
import levelsJson from '../../dist-electron/levels.json';
export interface Level {
  level: number;
  currentLevelXp: number;
  nextLevelXp: number;
}
export interface Badge {
  image?: string;
  name: string;
  description: string;
  condition: boolean;
}

export class TotalStudyAnalyticsGamificationEngine {
  #currentXp: number;
  #badges;
  #state: StudyAnalyticsState;
  constructor(state: StudyAnalyticsState) {
    console.log('constructor called');
    this.#state = state;
    this.#currentXp = state.totalXp.total_xp;
    this.#badges = this.#buildBadges(state.totalStudyAnalytics);
  }

  #buildBadges(totalStudyAnalytics: TotalStudyAnalytics) {
    const badges: Badge[] = [
      {
        image: icons.sproutIcon,
        name: 'Beginner Learner',
        description: 'Studied at least 5 flashcard.',
        condition: totalStudyAnalytics.total_flashcards_studied >= 5,
      },
      {
        image: icons.partyBlowerIcon,
        name: 'Dedicated Student',
        description: 'Maintained a consistent study routine.',
        condition: totalStudyAnalytics.total_flashcards_studied >= 10,
      },
      {
        image: icons.starIcon,
        name: 'Flashcard Enthusiast',
        description: 'Studied over 200 flashcards.',
        condition: totalStudyAnalytics.total_flashcards_studied >= 200,
      },
      {
        image: icons.globalEducationIcon,
        name: 'Worldly Student',
        description: 'Studied for over 500 minutes.',
        condition: totalStudyAnalytics.total_time_studied >= 500 * 60, // in minutes
      },
      {
        image: icons.crownIcon,
        name: 'Flashcard Master',
        description: 'Studied over 1000 flashcards.',
        condition: totalStudyAnalytics.total_flashcards_studied >= 1000,
      },
      {
        image: icons.skull,
        name: 'Flashcard Expert',
        description: 'Studied over 2000 flashcards.',
        condition: totalStudyAnalytics.total_flashcards_studied >= 2000,
      },
      {
        image: icons.ninjaIcon,
        name: 'Locked In',
        description: 'Reach level 10.',
        condition: this.getLevel()?.level >= 10,
      },
      {
        image: icons.goldMedalIcon,
        name: 'Flashcard Champion',
        description: 'Reach level 20.',
        condition: this.getLevel()?.level >= 20,
      },
      {
        image: icons.fireIcon,
        name: "Er'day",
        description: 'Study 7 days in a row.',
        condition: this.getStreaks().longestStreak >= 7,
      },
      {
        image: icons.smileIcon,
        name: 'No life.com',
        description: 'Study 30 days in a row.',
        condition: this.getStreaks().longestStreak >= 30,
      },
    ];
    return badges;
  }

  #calculateStreaks(studySessions: DailyStudyAnalytics[]) {
    if (studySessions.length === 0) {
      return {
        currentStreak: 0,
        longestStreak: 0,
      };
    }

    let currentStreak = 0;
    let longestStreak = 0;
    let currentDate = new Date(studySessions[0].study_date);

    for (let i = 0; i < studySessions.length; i++) {
      const { study_date, total_flashcards_studied } = studySessions[i];

      // Check if the date is consecutive
      const isConsecutiveDate =
        new Date(currentDate.getTime() + 24 * 60 * 60 * 1000).toDateString() ===
        new Date(study_date).toDateString();

      if (isConsecutiveDate && total_flashcards_studied > 0) {
        // Increase the current streak
        currentStreak++;
      } else {
        // Reset current streak if the streak is broken
        currentStreak = total_flashcards_studied > 0 ? 1 : 0;
      }

      // Update the longest streak
      longestStreak = Math.max(longestStreak, currentStreak);

      // Update current date for the next iteration
      currentDate = new Date(study_date);
    }

    return {
      currentStreak,
      longestStreak,
    };
  }

  getStreaks() {
    return this.#calculateStreaks(this.#state.dailyStudyAnalytics);
  }

  getLevel(): Level {
    // const levels = this.#buildLevels(this.#currentXp);
    // return levels[levels.length - 1];
    return getLevelByXp(this.#currentXp) as Level;
  }

  getCurrentXp(): number {
    return this.#currentXp;
  }

  getProgress(): number {
    const level = this.getLevel();
    const { currentLevelXp, nextLevelXp } = level;
    const progress = Number(
      (
        ((this.#currentXp - currentLevelXp) / (nextLevelXp - currentLevelXp)) *
        100
      ).toFixed(2)
    );
    return progress;
  }

  getBadges() {
    return this.#badges.filter((badge) => badge.condition);
  }

  getBadgesCount() {
    return this.getBadges().length;
  }

  getBadgesProgress() {
    const badgesCount = this.getBadgesCount();
    const badges = this.#badges.length;
    return Number(((badgesCount / badges) * 100).toFixed(2));
  }

  getAllBadges() {
    return this.#badges;
  }
}

export function getLevelByXp(xp: number): Level | undefined {
  const levels = levelsJson;
  const level = levels.find((level) => {
    return xp >= level.currentLevelXp && xp < level.nextLevelXp;
  });
  return level;
}
