import { StudyDuration } from './StudyDuration';
import { MostStudied } from './MostStudied';
import { StudyHistory } from './StudyHistory';
import { DailyStudy } from './DailyStudy';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  getDailyStudyAnalytics,
  getLastStudiedDeck,
  getMostStudiedDecks,
  getTotalAnalytics,
  getTotalXp,
} from '../api';
import {
  setDailyStudyAnalytics,
  setLastStudySession,
  setMostStudiedDecks,
  setTotalStudyAnalytics,
  setTotalXp,
} from '@/features/slice/analytics-slice';
import { USER_ID } from '@/constants';
import { StudyCalendar } from './StudyCalendar';
import { Achievments } from '@/features/gamification/components/Achievments';
import { XpBar } from '@/features/gamification/components/XpBar';
import { TotalStudyAnalyticsGamificationEngine } from '@/utils/gamification.engine';

export const AllStudyData = () => {
  const dispatch = useAppDispatch();
  const totalAnalyticsState = useAppSelector((state) => state.studyAnalytics);
  const [gamificationEngine, setGamificationEngine] =
    useState<TotalStudyAnalyticsGamificationEngine | null>(null);

  useEffect(() => {
    console.log('all study data mounted');
    getTotalAnalytics(USER_ID, (data) =>
      dispatch(setTotalStudyAnalytics(data[0]))
    );
    getDailyStudyAnalytics(USER_ID, (data) =>
      dispatch(setDailyStudyAnalytics(data))
    );
    getLastStudiedDeck(USER_ID, (data) =>
      dispatch(setLastStudySession(data[0]))
    );
    getMostStudiedDecks(USER_ID, (data) => dispatch(setMostStudiedDecks(data)));

    // get total xp
    getTotalXp(USER_ID, (data) => dispatch(setTotalXp(data)));
  }, [dispatch]);

  // const memoizedGamificationEngine = useCallback(() => {
  //   if (!totalAnalyticsState) return null;
  //   return new TotalStudyAnalyticsGamificationEngine(totalAnalyticsState);
  // }, [totalAnalyticsState]);

  // useEffect(() => {
  //   if (!memoizedGamificationEngine) return;
  //   setGamificationEngine(memoizedGamificationEngine);
  // }, [memoizedGamificationEngine]);

  return (
    <div>
      <div
        className='
        bg-gradient-to-b
        from-orange-400/10
        to-transparent
        w-full
        h-[200px]
        left-0
        top-0
        absolute
        z-[-1] animate-fade-in'
      ></div>
      <div className='flex items-center justify-between my-8'>
        <h3 className='text-2xl font-bold'>Progression</h3>
      </div>
      {/* <div className='flex justify-between'>
        <div className='xp w-[400px]'>
          <XpBar gamificationEngine={gamificationEngine} />
        </div>
        <div className='flex flex-col gap-4'>
          <h4>Achievement</h4>
          <Achievments gamificationEngine={gamificationEngine} />
        </div>
      </div> */}

      <div className='flex items-center justify-between my-8 '>
        <h3 className='text-2xl font-bold'>Study Analytics</h3>
      </div>
      <div className='grid grid-cols-3 gap-4 my-4'>
        <div className='flex flex-col gap-4'>
          <StudyDuration
            analyticsData={totalAnalyticsState.totalStudyAnalytics}
          />
          <MostStudied analyticsData={totalAnalyticsState.mostStudiedDecks} />
        </div>
        <div className='flex flex-col gap-4'>
          <DailyStudy analyticsData={totalAnalyticsState.dailyStudyAnalytics} />
        </div>
        <div className='flex flex-col gap-4'>
          <StudyHistory analyticsData={totalAnalyticsState.lastStudySession} />
          <StudyCalendar
            analyticsData={totalAnalyticsState.dailyStudyAnalytics}
          />
        </div>
      </div>
    </div>
  );
};
