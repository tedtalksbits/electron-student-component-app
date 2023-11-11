import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { Metric, Divider, Title } from '@tremor/react';
import { useEffect } from 'react';
import { getLastStudiedDeck } from '../api';
import { USER_ID } from '@/constants';
import { setLastStudySession } from '@/features/slice/analytics-slice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { secondsToMinutes } from '@/lib/utils';
import { StudyCalendar } from './StudyCalendar';
import { Progress } from 'antd';

export const StudyHistory = () => {
  const dispatch = useAppDispatch();
  const lastStudySession = useAppSelector(
    (state) => state.studyAnalytics.lastStudySession
  );

  const dailyStudyAnalytics = useAppSelector(
    (state) => state.studyAnalytics.dailyStudyAnalytics
  );

  useEffect(() => {
    getLastStudiedDeck(USER_ID, (data) =>
      dispatch(setLastStudySession(data[0]))
    );
  }, [dispatch]);
  return (
    <Card className='border-none'>
      <CardHeader>
        <CardTitle>Study History ➰</CardTitle>
      </CardHeader>
      <CardContent>
        <small className='text-foreground/50'>
          Last Study Session:{' '}
          <span className='text-foreground'>{lastStudySession?.name}</span>
        </small>

        <Metric>
          {new Date(lastStudySession?.end_time).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          })}
        </Metric>
        <Divider />
        <small className='text-foreground/50'>Flashcards Studied</small>
        <Metric>{lastStudySession?.flashcards_studied}</Metric>
        <Divider />

        <small className='text-foreground/50'>Time Spent Studying</small>
        <Metric>
          {secondsToMinutes(Number(lastStudySession?.duration_sec))} minutes
        </Metric>

        <Divider />
        <StudyCalendar data={dailyStudyAnalytics} />
      </CardContent>
    </Card>
  );
};
