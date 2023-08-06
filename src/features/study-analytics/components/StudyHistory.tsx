import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { Text, Metric, Divider } from '@tremor/react';
import { useEffect } from 'react';
import { getLastStudiedDeck } from '../api';
import { USER_ID } from '@/constants';
import { setLastStudySession } from '@/features/slice/analytics-slice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
export const StudyHistory = () => {
  const dispatch = useAppDispatch();
  const lastStudySession = useAppSelector(
    (state) => state.studyAnalytics.lastStudySession
  );

  useEffect(() => {
    getLastStudiedDeck(USER_ID, (data) =>
      dispatch(setLastStudySession(data[0]))
    );
  }, [dispatch]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Study History</CardTitle>
      </CardHeader>
      <CardContent>
        <Text>Last Study Session</Text>
        {lastStudySession?.name}
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
        <Text>Flashcards Studied</Text>
        <Metric>{lastStudySession?.flashcards_studied}</Metric>
        <Divider />
        <Text>Time Spent Studying</Text>
        <Metric>
          {(lastStudySession?.duration_sec / 60).toFixed(2)} minutes
        </Metric>
      </CardContent>
    </Card>
  );
};
