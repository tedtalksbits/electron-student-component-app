import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDayNameByDayIndex(index: number) {
  switch (index) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
  }
}

export function getCurrentSemesterByDate(date: Date) {
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  let term = '';
  switch (currentMonth) {
    case 0:
    case 1:
    case 2:
    case 3:
      term = 'Summer';
      break;
    case 4:
    case 5:
    case 6:
      term = 'Spring';
      break;
    case 7:
    case 8:
    case 9:
    case 10:
      term = 'Fall';
      break;
    case 11:
      term = 'Winter';
      break;
  }

  return {
    term,
    year: currentYear,
  };
}

export function secondsToMinutes(seconds: number) {
  if (!seconds) return 0;
  const mins = seconds / 60;
  return mins.toFixed(2);
}

const timeFromNow = (
  date: string | number | Date | dayjs.Dayjs | null | undefined
) => {
  return dayjs(date).fromNow();
};

export const dayjsUtils = {
  timeFromNow,
};
