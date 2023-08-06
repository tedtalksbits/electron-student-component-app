import { fetchDeckById } from '@/features/decks/api';
import { DeckType } from '@/features/decks/types';
import { StudySession } from '@/features/study/types';
import {
  Card,
  Text,
  BarChart,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
} from '@tremor/react';
import { useEffect, useState } from 'react';
import { getDailyStudyAnalytics } from '../api';
import { USER_ID } from '../../../constants/index';

export type DailyStudyAnalytics = {
  study_date: string;
  total_flashcards_studied: number;
};

export const MostStudied = () => {
  const [dailyStudyAnalytics, setDailyStudyAnalytics] = useState<
    DailyStudyAnalytics[]
  >([]);
  useEffect(() => {
    getDailyStudyAnalytics(USER_ID, setDailyStudyAnalytics);
  }, []);

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
      {JSON.stringify(dailyStudyAnalytics)}
      <Card>
        <Title>Daily Studying</Title>
        <BarChart
          className='mt-6'
          data={barchartData}
          categories={['total_flashcards_studied']}
          index='study_date'
        />
      </Card>
      {/* <Card>
        <Title>Most Studied Deck</Title>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Deck Name</TableHeaderCell>
              <TableHeaderCell>Duration (sec)</TableHeaderCell>
              <TableHeaderCell>Cards Studied</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{deck[0]?.name}</TableCell>
              <TableCell>{mostStudiedDeck?.duration_sec}</TableCell>
              <TableCell>{mostStudiedDeck?.flashcards_studied}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card> */}
    </div>
  );
};
