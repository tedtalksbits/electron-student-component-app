import {
  BarChart,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
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
import { Progress } from 'antd';
import { Badge } from '@/components/ui/badge';

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

  const today = new Date().toLocaleDateString();
  const lastStudySession = dailyStudyAnalytics.filter(
    (studySession) =>
      new Date(studySession?.study_date).toLocaleDateString() === today
  )[0];

  const hasStudiedDaily = (minFlashcards: number, minDurationSec: number) => {
    return (
      lastStudySession?.total_flashcards_studied >= minFlashcards &&
      lastStudySession?.total_duration_sec >= minDurationSec
    );
  };
  const calculatePercent = (current: number, total: number) => {
    if (!current || !total) return 0;
    return Math.ceil((current / total) * 100);
  };

  const isStudied10Cards = hasStudiedDaily(10, 0);
  const isStudied20Cards = hasStudiedDaily(20, 0);
  const isStudied5Minutes = hasStudiedDaily(0, 300);
  const isStudied10Minutes = hasStudiedDaily(0, 600);

  const studyProgress10Cards = calculatePercent(
    lastStudySession?.total_flashcards_studied,
    10
  );
  const studyProgress20Cards = calculatePercent(
    lastStudySession?.total_flashcards_studied,
    20
  );
  const studyProgress5Min = calculatePercent(
    lastStudySession?.total_duration_sec,
    300
  );
  const studyProgress10Min = calculatePercent(
    lastStudySession?.total_duration_sec,
    600
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
      <Card className='border-none'>
        <CardHeader>
          <CardTitle>
            Daily Goals <span>🎖️</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <small className='text-foreground/50'>Daily Tasks</small>
          <span className='text-foreground block text-center'>
            {isStudied10Cards && isStudied5Minutes && isStudied10Minutes && (
              <span className='inline-block ml-auto'>
                Well Done!{' '}
                <span className='animate-bounce inline-block'>🎊</span>
              </span>
            )}
          </span>
          <div
            className={`daily p-2 border rounded-md my-2 ${
              isStudied10Cards
                ? 'bg-success/5 border-success/10'
                : 'animate-shine [animation-delay:.25s]'
            } `}
          >
            <small className='block'>
              Study 10 Cards {isStudied10Cards && '✅'}
            </small>
            <Progress percent={studyProgress10Cards} />
          </div>
          <div
            className={`daily p-2 border rounded-md my-2 ${
              isStudied20Cards
                ? 'bg-success/5 border-success/10'
                : 'animate-shine [animation-delay:.35s]'
            } `}
          >
            <small className='block'>
              Study 20 Cards {isStudied20Cards && '✅'}
            </small>
            <Progress percent={studyProgress20Cards} />
          </div>
          <div
            className={`daily p-2 border rounded-md my-2 ${
              isStudied5Minutes
                ? 'bg-success/5 border-success/10'
                : 'animate-shine [animation-delay:.45s]'
            } `}
          >
            <small className='flex items-center justify-between'>
              <span>Study 5 Minutes {isStudied5Minutes && '✅'} </span>
              <span>
                {secondsToMinutes(
                  Number(lastStudySession?.total_duration_sec)
                ) || '0'}
                / 5 minutes
              </span>
            </small>
            <Progress percent={studyProgress5Min} />
          </div>
          <div
            className={`daily p-2 border rounded-md my-2 ${
              isStudied5Minutes
                ? 'bg-success/5 border-success/10'
                : 'animate-shine'
            } `}
          >
            <small className='flex items-center justify-between'>
              <span>Study 10 Minutes {isStudied5Minutes && '✅'} </span>
              <span>
                {secondsToMinutes(
                  Number(lastStudySession?.total_duration_sec)
                ) || '0'}{' '}
                / 10 minutes
              </span>
            </small>
            <Progress percent={studyProgress10Min} />
          </div>
          <Divider />
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
      <Card className='border-none'>
        <CardHeader>
          <CardTitle>Most Studied Decks 🏆</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell title='Deck Name'>Deck Name</TableHeaderCell>
                <TableHeaderCell title='Duration (mins)'>
                  Duration (mins)
                </TableHeaderCell>
                <TableHeaderCell title='Card Studied'>
                  Cards Studied
                </TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mostStudiedDecks.map((deck) => {
                return (
                  <TableRow key={deck.id}>
                    <TableCell>
                      <small>{deck.name}</small>
                    </TableCell>
                    <TableCell>
                      <small>
                        {secondsToMinutes(Number(deck.total_duration))}
                      </small>
                    </TableCell>
                    <TableCell>
                      <small>{deck.total_flashcards_studied}</small>
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
