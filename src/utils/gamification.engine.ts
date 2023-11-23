import { TotalStudyAnalytics } from '@/features/study-analytics/types';
import { icons } from './icons';

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
  constructor(totalStudyAnalytics: TotalStudyAnalytics) {
    console.log('totalStudyAnalytics', totalStudyAnalytics);
    this.#buildLevels(100000);
    this.#currentXp = this.#calculateXp(
      totalStudyAnalytics.total_flashcards_studied,
      totalStudyAnalytics.total_time_studied
    );
    this.#badges = this.#buildBadges(totalStudyAnalytics);
  }
  #calculateXp(
    total_flashcards_studied: number,
    total_time_studied: number
  ): number {
    console.table({
      total_flashcards_studied,
      total_time_studied,
    });
    const flashcardXp = Number(total_flashcards_studied * 10); // 10 XP per flashcard
    const timeXp = Math.floor(total_time_studied / 6); // 10 XP per 6 seconds
    console.table({
      flashcardXp,
      timeXp,
    });
    return flashcardXp + timeXp;
  }
  #buildLevels(totalXp: number): Level[] {
    const levels = [];
    let currentLevel = 1;
    let currentLevelXp = 0;
    let nextLevelXp = 10 * Math.pow(2, currentLevel);
    while (currentLevelXp < totalXp) {
      const level = {
        level: currentLevel,
        currentLevelXp,
        nextLevelXp,
      };
      levels.push(level);
      currentLevelXp = nextLevelXp;
      currentLevel++;
      nextLevelXp = 10 * Math.pow(2, currentLevel);
    }

    return levels;
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
        description: 'Studied continuously for 3 hours in one session.',
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
        condition: this.getLevel().level >= 10,
      },
      {
        image: icons.goldMedalIcon,
        name: 'Flashcard Champion',
        description: 'Reach level 20.',
        condition: this.getLevel().level >= 20,
      },
      {
        image: icons.fireIcon,
        name: "Er'day",
        description: 'Study 7 days in a row.',
        condition: false,
      },
      {
        image: icons.smileIcon,
        name: 'No life.com',
        description: 'Study 30 days in a row.',
        condition: false,
      },
    ];
    return badges;
  }

  getLevel(): Level {
    const levels = this.#buildLevels(this.#currentXp);
    return levels[levels.length - 1];
  }

  getCurrentXp(): number {
    return this.#currentXp;
  }

  getProgress(): number {
    const level = this.getLevel();
    const progress = this.#currentXp / level.nextLevelXp;
    return Number((progress * 100).toFixed(2));
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
