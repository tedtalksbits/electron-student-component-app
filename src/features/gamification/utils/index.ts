import {
  DailyStudyAnalytics,
  StudyAnalyticsState,
} from '@/features/study-analytics/types';
import { UserLevel } from '../../user/types';
import { icons } from '@/utils/icons';
export function calculateStreaks(studySessions: DailyStudyAnalytics[]) {
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

type Badge = {
  image: string;
  name: string;
  description: string;
  condition: (x: number) => boolean;
  lore: string;
};

const levelBadges: Badge[] = [
  {
    image: icons.dalleLevel10,
    name: "The Scholar's Scroll",
    description:
      'Earned by diligent students who have reached Level 10 or higher in their studies.',
    condition: (level: number) => level >= 10,
    lore: "The Scholar's Scroll is a symbol of your dedication to the pursuit of knowledge. As you've climbed the academic ladder, your thirst for learning has been unquenchable. This ancient scroll, filled with wisdom from generations past, recognizes your hard work and commitment. It whispers secrets of scholars long gone and promises even greater revelations as you continue your academic journey.",
  },
  {
    image: icons.dalleLevel20,
    name: "Bookworm's Badge",
    description:
      "Awarded to those who've achieved Level 20 or more, proving their voracious appetite for reading and learning.",
    condition: (level: number) => level >= 20,
    lore: "The Bookworm's Badge is a testament to your insatiable love for books and knowledge. With each page you've turned and each concept you've mastered, you've grown wiser and more well-read. This badge signifies your commitment to lifelong learning and serves as a reminder that there is always more to explore within the pages of a good book.",
  },
  {
    image: icons.dalleLevel50,
    name: "Mastermind's Medallion",
    description:
      'Granted to those who have reached Level 50 or higher, showcasing their exceptional intellect and problem-solving skills.',
    condition: (level: number) => level >= 50,
    lore: "The Mastermind's Medallion shines as brightly as the ideas and solutions that have emerged from your brilliant mind. You've tackled complex problems, dissected intricate theories, and emerged victorious. This medallion serves as a testament to your analytical prowess and your ability to find innovative solutions in the world of academia.",
  },
  {
    image: icons.dalleLevel100,
    name: "Sage's Staff",
    description:
      "Conferred upon those who've reached Level 100 or higher, signifying their wisdom and leadership within the academic community.",
    condition: (level: number) => level >= 100,
    lore: "The Sage's Staff is a symbol of your ascension to the highest echelons of scholarly achievement. You've not only mastered your field of study but have also become a guiding light for others on their academic journeys. With this staff in hand, you are recognized as a true sage, ready to impart your wisdom and knowledge to the next generation of scholars. 'The beautiful thing about learning is that no one can take it away from you.' - B.B. King",
  },
];

const xpBadges: Badge[] = [
  {
    image: icons.dalleSprout,
    name: 'Novice Knowledge Seeker',
    description:
      'Achieved after accumulating 25,000 XP in your pursuit of learning.',
    condition: (total_xp: number) => total_xp >= 25000,
    lore: "The Novice Knowledge Seeker award recognizes your dedication to expanding your horizons through learning. With 25,000 XP under your belt, you've proven your commitment to acquiring new knowledge and skills. Your journey has just begun, and this award marks the first step on your path to becoming a true scholar.",
  },
  {
    image: icons.dalleSprout2,
    name: 'Seasoned Scholar',
    description:
      'Earned after amassing 50,000 XP, showcasing your continued growth and expertise.',
    condition: (total_xp: number) => total_xp >= 50000,
    lore: "The Seasoned Scholar award celebrates your significant progress in your academic journey. With 50,000 XP, you've demonstrated your dedication and a thirst for knowledge that goes beyond the ordinary. Your journey has transformed you into a seasoned expert in your chosen field, and this award is a testament to your ongoing commitment to excellence.",
  },
  {
    image: icons.dalleGlobe,
    name: 'Master of Mastery',
    description:
      'Attained after accumulating 100,000 XP, signifying your mastery of diverse subjects.',
    condition: (total_xp: number) => total_xp >= 100000,
    lore: "The Master of Mastery award represents your exceptional achievements in the realm of academia. With 100,000 XP, you've ventured into the depths of knowledge and emerged as a true master of various subjects. This ancient scroll symbolizes your unparalleled expertise and your ability to navigate the complex web of learning with grace and finesse.",
  },
  {
    image: icons.dalleShield,
    name: 'Grand Luminary of Learning',
    description:
      "Conferred upon those who've reached an astounding 1,000,000 XP, marking them as beacons of enlightenment within your community.",
    condition: (total_xp: number) => total_xp >= 1000000,
    lore: 'The Grand Luminary of Learning award is the highest honor bestowed upon the most dedicated and accomplished scholars. With 1,000,000 XP, you have ascended to the highest echelons of knowledge. Your wisdom shines like a radiant beacon, inspiring others on their intellectual journeys. This award signifies your role as a guiding light in the world of learning, illuminating the path for all who seek to follow. "Education is the most powerful weapon which you can use to change the world." - Nelson Mandela',
  },
];
const streakBadges: Badge[] = [
  {
    image: icons.dalleDailyDevotee,
    name: 'Daily Devotee',
    description:
      'Awarded for maintaining a daily studying streak for 7 consecutive days.',
    condition: (streak: number) => streak >= 7,
    lore: "The Daily Devotee award celebrates your unwavering commitment to daily learning. For 7 days straight, you've greeted each day with the thirst for knowledge, making learning an integral part of your routine. As the sun rises on your dedication, this award shines brightly to honor your daily devotion to self-improvement.",
  },
  {
    image: icons.dalleFlames,
    name: 'Weekly Warrior',
    description:
      'Awarded for maintaining a daily studying streak for 30 consecutive days.',
    condition: (streak: number) => streak >= 30,
    lore: "The Weekly Warrior award celebrates your unwavering commitment to daily learning. For 7 days straight, you've greeted each day with the thirst for knowledge, making learning an integral part of your routine. As the sun rises on your dedication, this award shines brightly to honor your daily devotion to self-improvement.",
  },
];
const studyTimeBadges: Badge[] = [
  {
    image: icons.dalleTimeKeeper,
    name: "Timekeeper's Token",
    description:
      'Earned after accumulating a total of 500 Minutes of study time.',
    condition: (totalTimeStudied: number) => totalTimeStudied >= 500 * 60, // in seconds
    lore: "The Timekeeper's Token acknowledges the countless hours you've spent honing your skills and expanding your mind. With 500 minutes of study time, you've dedicated yourself to the pursuit of knowledge. This award is a testament to your time management, discipline, and your commitment to becoming the best version of yourself.",
  },
  {
    image: icons.dalleRockOn,
    name: 'Rock On!',
    description:
      'Awarded for accumulating a total of 1000 Minutes of study time.',
    condition: (totalTimeStudied: number) => totalTimeStudied >= 1000 * 60,
    lore: "The Rock On! award celebrates your commitment to learning. With 1000 minutes of study time, you've proven your dedication to self-improvement and your willingness to put in the work. This award is a testament to your discipline and your ability to stay focused on your goals.",
  },
  {
    image: icons.dalleCrown2,
    name: 'Crowned Endurer',
    description:
      'Awarded for accumulating a total of 5000 Minutes of study time.',
    condition: (totalTimeStudied: number) => totalTimeStudied >= 5000 * 60,
    lore: "The Crowned Endurer award celebrates your commitment to learning. With 5000 minutes of study time, you've proven your dedication to self-improvement and your willingness to put in the work. This award is a testament to your discipline and your ability to stay focused on your goals.",
  },
  {
    image: icons.dalleCrown,
    name: 'King of Kings, Queen of Queens',
    description:
      'Awarded for accumulating a total of 10000 Minutes of study time.',
    condition: (totalTimeStudied: number) => totalTimeStudied >= 10000 * 60,
    lore: 'The King of Kings, Queen of Queens award celebrates your commitment to learning. With 10000 minutes of study time, you\'ve proven your dedication to self-improvement and your willingness to put in the work. This award is a testament to your discipline and your ability to stay focused on your goals. "Excellence is never an accident. It is always the result of high intention, sincere effort, and intelligent execution; it represents the wise choice of many alternatives - choice, not chance, determines your destiny." - Aristotle',
  },
];

const studyFlashcardBadges: Badge[] = [
  {
    image: icons.dalleFlashcardWizard,
    name: 'Flashcard Wizard',
    description:
      'Attained after studying 1,000 flashcards, showcasing your mastery of key concepts.',
    condition: (totalFlashcardsStudied: number) =>
      totalFlashcardsStudied >= 1000,
    lore: "The Flashcard Wizard award is a tribute to your diligence in mastering key concepts. With 1,000 flashcards under your belt, you've proven your dedication to understanding and retaining essential knowledge. As the cards fly before you, this award recognizes your expertise in navigating the world of flashcards with ease and confidence.",
  },
  {
    image: icons.dalleCloudLightning,
    name: 'Lightning Learner',
    description:
      'Awarded for studying 2,000 flashcards, demonstrating your ability to quickly absorb new information.',
    condition: (totalFlashcardsStudied: number) =>
      totalFlashcardsStudied >= 2000,
    lore: "The Lightning Learner award celebrates your ability to quickly absorb new information. With 2,000 flashcards under your belt, you've proven your ability to learn and retain knowledge at lightning speed. This award is a testament to your sharp mind and your ability to master new concepts with ease.",
  },
  {
    image: icons.dalleBulb,
    name: 'Illuminator',
    description:
      'Awarded for studying 5,000 flashcards, demonstrating your ability to quickly absorb new information.',
    condition: (totalFlashcardsStudied: number) =>
      totalFlashcardsStudied >= 5000,
    lore: "The Illuminator award celebrates your ability to quickly absorb new information. With 5,000 flashcards under your belt, you've proven your ability to learn and retain knowledge at lightning speed. This award is a testament to your sharp mind and your ability to master new concepts with ease.",
  },
  {
    image: icons.dalleBookworm,
    name: 'Bookworm',
    description:
      'Awarded for studying 10,000 flashcards, demonstrating your ability to quickly absorb new information.',
    condition: (totalFlashcardsStudied: number) =>
      totalFlashcardsStudied >= 10000,
    lore: "The Bookworm award celebrates your ability to quickly absorb new information. With 10,000 flashcards under your belt, you've proven your ability to learn and retain knowledge at lightning speed. This award is a testament to your sharp mind and your ability to master new concepts with ease.",
  },
  {
    image: icons.dalleAtom,
    name: 'Atom',
    description:
      'Awarded for studying 20,000 flashcards, demonstrating your ability to quickly absorb new information.',
    condition: (totalFlashcardsStudied: number) =>
      totalFlashcardsStudied >= 20000,
    lore: "The Atom award celebrates your ability to quickly absorb new information. With 20,000 flashcards under your belt, you've proven your ability to learn and retain knowledge at lightning speed. This award is a testament to your sharp mind and your ability to master new concepts with ease. 'The more that you read, the more things you will know. The more that you learn, the more places you'll go.' - Dr. Seuss",
  },
];

export type AchievementBadge = ReturnType<typeof getLevelAndXpBadges>[number];
export function getLevelAndXpBadges(userLevel: UserLevel) {
  const { level, total_xp } = userLevel;

  const levelBadge = levelBadges.map((badge) => {
    return {
      ...badge,
      condition: badge.condition(level),
    };
  });

  const xpBadge = xpBadges.map((badge) => {
    return {
      ...badge,
      condition: badge.condition(total_xp),
    };
  });
  return [...levelBadge, ...xpBadge];
}

export function getStudyAnalyticsBadges(studySessions: StudyAnalyticsState) {
  const { longestStreak } = calculateStreaks(studySessions.dailyStudyAnalytics);
  console.log(longestStreak);

  const streakBadge = streakBadges.map((badge) => {
    return {
      ...badge,
      condition: badge.condition(longestStreak),
    };
  });

  const { total_flashcards_studied, total_time_studied } =
    studySessions.totalStudyAnalytics;

  const studyTimeBadge = studyTimeBadges.map((badge) => {
    return {
      ...badge,
      condition: badge.condition(total_time_studied),
    };
  });

  const studyFlashcardBadge = studyFlashcardBadges.map((badge) => {
    return {
      ...badge,
      condition: badge.condition(total_flashcards_studied),
    };
  });

  return [...streakBadge, ...studyTimeBadge, ...studyFlashcardBadge];
}
