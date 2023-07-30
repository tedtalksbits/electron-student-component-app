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

type MostStudiedProps = {
  studySessions: StudySession[];
};
export const MostStudied = ({ studySessions }: MostStudiedProps) => {
  /*
  
    prepare data for BarChart component
   studySessions = [
    {
      "id": 1,
      "deck_id": 1,
      user_id: 1,
      "flashcards_studied": 1,
      start_time: "2021-08-24T18:00:00.000Z",
      end_time: "2021-08-24T18:00:00.000Z",
    },
    ...
  ]

  barchartData = [
    {
      day: 'Jul 1',
      flashcards_studied: [add all flashcards_studied for each day],
    },

  */

  const barchartData = studySessions.reduce((acc, curr) => {
    const day = new Date(curr.start_time).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

    const existingDay = acc.find((item) => item.day === day);
    if (existingDay) {
      existingDay.flashcards_studied += curr.flashcards_studied;
    } else {
      acc.push({
        day,
        flashcards_studied: curr.flashcards_studied,
      });
    }
    return acc;
  }, [] as { day: string; flashcards_studied: number }[]);

  //  most study algorithm: group by deck_id, then sum duration_sec

  const mostStudiedDeck = studySessions
    .reduce((acc, curr) => {
      const existingDeck = acc.find((item) => item.deck_id === curr.deck_id);
      if (existingDeck) {
        existingDeck.duration_sec += curr.duration_sec;
        existingDeck.flashcards_studied += curr.flashcards_studied;
      } else {
        acc.push({
          deck_id: curr.deck_id,
          duration_sec: curr.duration_sec,
          flashcards_studied: curr.flashcards_studied,
        });
      }
      return acc;
    }, [] as { deck_id: number; duration_sec: number; flashcards_studied: number }[])
    .sort((a, b) => {
      return b.duration_sec - a.duration_sec;
    })[0];
  const [deck, setDeck] = useState<DeckType[]>([]);
  useEffect(() => {
    fetchDeckById(mostStudiedDeck?.deck_id, setDeck);
  }, [mostStudiedDeck?.deck_id]);

  return (
    <div className='flex flex-col gap-4'>
      <Card>
        <Title>Daily Studying</Title>
        <BarChart
          className='mt-6'
          data={barchartData}
          categories={['flashcards_studied']}
          index='day'
        />
      </Card>
      <Card>
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
      </Card>
    </div>
  );
};
