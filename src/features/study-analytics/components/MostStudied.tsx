import {
  Text,
  BarChart,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';
import { useEffect } from 'react';
import { getDailyStudyAnalytics, getMostStudiedDecks } from '../api';
import { USER_ID } from '../../../constants/index';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  setDailyStudyAnalytics,
  setMostStudiedDecks,
} from '@/features/slice/analytics-slice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { secondsToMinutes } from '@/lib/utils';
export type DailyStudyAnalytics = {
  study_date: string;
  total_flashcards_studied: number;
};

export const MostStudied = () => {
  const dispatch = useAppDispatch();
  const dailyStudyAnalytics = useAppSelector(
    (state) => state.studyAnalytics.dailyStudyAnalytics
  );
  const mostStudiedDecks = useAppSelector(
    (state) => state.studyAnalytics.mostStudiedDecks
  );

  useEffect(() => {
    getDailyStudyAnalytics(USER_ID, (data) =>
      dispatch(setDailyStudyAnalytics(data))
    );
    getMostStudiedDecks(USER_ID, (data) => dispatch(setMostStudiedDecks(data)));
  }, [dispatch]);

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

  return (
    <div className='flex flex-col gap-4'>
      <Card className='border-none'>
        <CardHeader>
          <CardTitle>Daily Studying</CardTitle>
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
      <Card className='border-none'>
        <CardHeader>
          <CardTitle>Most Studied Decks</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Deck Name</TableHeaderCell>
                <TableHeaderCell>Duration (min)</TableHeaderCell>
                <TableHeaderCell>Cards Studied</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mostStudiedDecks.map((deck) => {
                return (
                  <TableRow key={deck.id}>
                    <TableCell>
                      <Text>{deck.name}</Text>
                    </TableCell>
                    <TableCell>
                      <Text>
                        {secondsToMinutes(Number(deck.total_duration))}
                      </Text>
                    </TableCell>
                    <TableCell>
                      <Text>{deck.total_flashcards_studied}</Text>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
