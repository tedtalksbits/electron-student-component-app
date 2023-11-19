import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { BarChart } from '@tremor/react';

import { secondsToMinutes } from 'date-fns';
import { getDailyStudyAnalytics } from '../api';
import { USER_ID } from '@/constants';
import { setDailyStudyAnalytics } from '@/features/slice/analytics-slice';
import { useEffect } from 'react';
import { DailyStudyAnalytics } from '../types';
import ProgressDisplay from '@/components/ui/progress-display';

export const DailyStudy = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    getDailyStudyAnalytics(USER_ID, (data) =>
      dispatch(setDailyStudyAnalytics(data))
    );
  }, [dispatch]);
  const dailyStudyAnalytics = useAppSelector(
    (state) => state.studyAnalytics.dailyStudyAnalytics
  );

  const lastStudySession = filterByCurrentDate(dailyStudyAnalytics);

  /*
    ========================================
    Flashcard goals
    ========================================
  */

  const isStudied20Cards = goals.flashcards.isCompleted(
    'medium',
    lastStudySession?.total_flashcards_studied
  );

  /*
    ========================================
    Duration goals
    ========================================
  */

  const isStudied10Minutes = goals.duration.isCompleted(
    'medium',
    lastStudySession?.total_duration_sec
  );

  /*
    ========================================
    Progress
    ========================================
  */

  const studyProgress10Cards = goals.flashcards.calculateProgress(
    'easy',
    lastStudySession?.total_flashcards_studied
  );
  const studyProgress20Cards = goals.flashcards.calculateProgress(
    'medium',
    lastStudySession?.total_flashcards_studied
  );
  const studyProgress5Min = goals.duration.calculateProgress(
    'easy',
    lastStudySession?.total_duration_sec
  );
  const studyProgress10Min = goals.duration.calculateProgress(
    'medium',
    lastStudySession?.total_duration_sec
  );

  const barchartData = dailyStudyAnalytics.map((studySession) => {
    return {
      ...studySession,
      study_date: new Date(studySession.study_date).toLocaleDateString(
        'en-US',
        {
          month: 'short',
          day: 'numeric',
        }
      ),
    };
  });

  const currentStreak = dailyStudyAnalytics.reduce((acc, curr) => {
    if (curr.total_flashcards_studied >= 10) {
      acc += 1;
    } else {
      acc = 0;
    }

    return acc;
  }, 0);

  const longestStreak = dailyStudyAnalytics.reduce(
    (acc, curr) => {
      if (curr.total_flashcards_studied >= 10) {
        // If the current study session has 10 or more flashcards studied, increment the current streak
        acc.currentStreak += 1;
      } else {
        // If the current study session has less than 10 flashcards studied, reset the current streak
        acc.currentStreak = 0;
      }

      // Update the longest streak if the current streak is longer
      acc.longestStreak = Math.max(acc.longestStreak, acc.currentStreak);

      return acc;
    },
    { currentStreak: 0, longestStreak: 0 }
  ).longestStreak;

  return (
    <div className='flex flex-col gap-4'>
      <Card className='border-none relative'>
        <CardHeader>
          <CardTitle>
            Daily Goals <span>🎖️</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <small className='text-foreground/50'>Daily Tasks</small>

          <span className='text-foreground block text-center'>
            {isStudied20Cards && isStudied10Minutes && (
              <>
                <span className='inline-block ml-auto'>
                  Well Done!{' '}
                  <span className='animate-bounce inline-block'>🎊</span>
                </span>
                <div className='firework'></div>
                <div className='firework'></div>
                <div className='firework'></div>
              </>
            )}
          </span>

          <ProgressDisplay
            title={`${lastStudySession?.total_flashcards_studied}/10 cards studied`}
            label='Study 10 Cards'
            progress={studyProgress10Cards}
            total={100}
            className='relative'
          >
            <span className='text-foreground/50 absolute text-xs right-1 top-4'>
              {lastStudySession?.total_flashcards_studied ?? 0}/10 Cards
            </span>
          </ProgressDisplay>

          <ProgressDisplay
            label='Study 20 Cards'
            progress={studyProgress20Cards}
            total={100}
            className='relative'
          >
            <span className='text-foreground/50 absolute text-xs right-1 top-4'>
              {lastStudySession?.total_flashcards_studied ?? 0}/20 Cards
            </span>
          </ProgressDisplay>

          <ProgressDisplay
            label='Study 5 Minutes'
            progress={studyProgress5Min}
            total={100}
            className='relative'
          >
            <span className='text-foreground/50 absolute text-xs right-1 top-4'>
              {secondsToMinutes(lastStudySession?.total_duration_sec ?? 0)}/5
              mins
            </span>
          </ProgressDisplay>
          <ProgressDisplay
            label='Study 10 Minutes'
            progress={studyProgress10Min}
            total={100}
            className='relative'
          >
            <span className='text-foreground/50 absolute text-xs right-1 top-4'>
              {secondsToMinutes(lastStudySession?.total_duration_sec ?? 0)}/10
              mins
            </span>
          </ProgressDisplay>
        </CardContent>
      </Card>
      <Card className='border-none'>
        <CardHeader>
          <div className=''>
            <CardTitle>Daily Studying 🌞</CardTitle>
            <div className='mt-2'>
              {currentStreak > 0 ? (
                <Badge
                  className='text-xs bg-secondary'
                  title='Number of times 10 or more cards were studied'
                >
                  Current streak: {currentStreak} day{' '}
                  {currentStreak >= 3 && '🔥'}
                </Badge>
              ) : (
                <Badge>No streak</Badge>
              )}
              {longestStreak > 0 && (
                <Badge className='bg-success/40 text-success'>
                  Longest streak: {longestStreak} days
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <BarChart
            className='mt-6'
            data={barchartData}
            categories={['total_flashcards_studied']}
            index='study_date'
          />
        </CardContent>
      </Card>
    </div>
  );
};

function filterByCurrentDate(studySessions: DailyStudyAnalytics[]) {
  const today = new Date().toLocaleDateString();
  return studySessions.filter(
    (studySession) =>
      new Date(studySession?.study_date).toLocaleDateString() === today
  )[0];
}

export type DailyGoalLevel = 'easy' | 'medium';

const goals = {
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
