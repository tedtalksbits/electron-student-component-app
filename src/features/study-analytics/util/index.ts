import { DailyStudyAnalytics } from '../types';

export type DailyGoalLevel = 'easy' | 'medium';
export const goals = {
  flashcards: {
    easy: {
      label: 'Study 10 Cards',
      minValue: 10,
    },
    medium: {
      label: 'Study 20 Cards',
      minValue: 20,
    },
    isCompleted: (goalLevel: DailyGoalLevel, value: number) => {
      return value >= goals.flashcards[goalLevel].minValue;
    },
    calculateProgress: (goalLevel: DailyGoalLevel, value: number) => {
      return Math.ceil((value / goals.flashcards[goalLevel].minValue) * 100);
    },
  },
  duration: {
    easy: {
      label: 'Study 5 Minutes',
      minValue: 300,
    },
    medium: {
      label: 'Study 10 Minutes',
      minValue: 600,
    },
    isCompleted: (goalLevel: DailyGoalLevel, value: number): boolean => {
      return value >= goals.duration[goalLevel].minValue;
    },
    calculateProgress: (goalLevel: DailyGoalLevel, value: number) => {
      return Math.ceil((value / goals.duration[goalLevel].minValue) * 100);
    },
  },
};

export function filterByCurrentDate(studySessions: DailyStudyAnalytics[]) {
  const today = new Date().toLocaleDateString();
  return studySessions.filter(
    (studySession) =>
      new Date(studySession?.study_date).toLocaleDateString() === today
  )[0];
}

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
