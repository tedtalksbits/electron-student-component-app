import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { Metric, Divider } from '@tremor/react';
import { getTotalAnalytics } from '../api';
import { setTotalStudyAnalytics } from '@/features/slice/analytics-slice';
import { USER_ID } from '@/constants';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { secondsToMinutes } from '@/lib/utils';

export const StudyDuration = () => {
  const dispatch = useAppDispatch();
  const totalAnalytics = useAppSelector(
    (state) => state.studyAnalytics.totalStudyAnalytics
  );

  useEffect(() => {
    getTotalAnalytics(USER_ID, (data) =>
      dispatch(setTotalStudyAnalytics(data[0]))
    );
  }, [dispatch]);

  return (
    <Card className='border-none'>
      <CardHeader>
        <CardTitle>Study Duration</CardTitle>
      </CardHeader>
      <CardContent>
        <small className='text-foreground/50'>Total Study Time</small>
        <Metric>
          {Math.floor(totalAnalytics.total_time_studied / 60)} minutes
        </Metric>
        <Divider />
        <small className='text-foreground/50'>Total Flashcards Studied</small>
        <Metric>{totalAnalytics.total_flashcards_studied}</Metric>
        <Divider />
        <small className='text-foreground/50'>Total Study Sessions</small>
        <Metric>{totalAnalytics.total_completed_sessions}</Metric>
        <Divider />
        <small className='text-foreground/50'>Average Study Duration</small>
        <Metric>
          {secondsToMinutes(totalAnalytics.average_study_duration)} minutes
        </Metric>
      </CardContent>
    </Card>
  );
};
