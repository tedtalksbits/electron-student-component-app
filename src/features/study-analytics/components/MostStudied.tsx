import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { secondsToMinutes } from '@/lib/utils';
import { LucideStar } from 'lucide-react';
import { MostStudiedDeck } from '../types';
import { Link } from 'react-router-dom';

export const MostStudied = ({
  analyticsData,
}: {
  analyticsData: MostStudiedDeck[];
}) => {
  return (
    <Card className='border-none'>
      <CardHeader>
        <CardTitle className='flex items-center text-orange-400'>
          <LucideStar className='mr-1' /> <p>Most Studied</p>
        </CardTitle>
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
            {analyticsData.map((deck) => {
              return (
                <TableRow key={deck.id}>
                  <TableCell>
                    <Link className='group' to={`/decks/${deck.id}/flashcards`}>
                      <small>{deck.name}</small>
                    </Link>
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
  );
};
