import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { Text, Metric, Divider } from '@tremor/react';
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
        <Text>Total Study Time</Text>
        <Metric>
          {Math.floor(totalAnalytics.total_time_studied / 60)} minutes
        </Metric>
        <Divider />
        <Text>Total Flashcards Studied</Text>
        <Metric>{totalAnalytics.total_flashcards_studied}</Metric>
        <Divider />
        <Text>Total Study Sessions</Text>
        <Metric>{totalAnalytics.total_completed_sessions}</Metric>
        <Divider />
        <Text>Average Study Duration</Text>
        <Metric>
          {secondsToMinutes(totalAnalytics.average_study_duration)} minutes
        </Metric>
      </CardContent>
    </Card>
  );
};
