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
import { LucideHammer, LucideStar } from 'lucide-react';
import { MostStudiedDeck } from '../types';
import { Link } from 'react-router-dom';

export const MostStudied = ({
  analyticsData,
}: {
  analyticsData: MostStudiedDeck[];
}) => {
  return (
    <div className='flex flex-col gap-4'>
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
              {analyticsData.slice(0, 7).map((deck) => {
                return (
                  <TableRow key={deck.id}>
                    <TableCell>
                      <Link
                        className='group/ms'
                        to={`/decks/${deck.id}/flashcards`}
                      >
                        <small>
                          {deck.name}{' '}
                          <span className='font-medium inline-block group-hover/ms:opacity-100 transition-all translate-x-[-10px] group-hover/ms:translate-x-0 opacity-0 text-foreground/50 rotate-0 group-hover/ms:-rotate-45'>
                            &rarr;
                          </span>
                        </small>
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
      <Card className='border-none'>
        <CardHeader>
          <CardTitle className='flex items-center text-orange-400'>
            <LucideHammer className='mr-1' /> <p>Least Studied</p>
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
              {analyticsData
                .slice(analyticsData.length - 7, analyticsData.length)
                .map((deck) => {
                  return (
                    <TableRow key={deck.id}>
                      <TableCell>
                        <Link
                          className='group/ls'
                          to={`/decks/${deck.id}/flashcards`}
                        >
                          <small>
                            {deck.name}{' '}
                            <span className='font-medium inline-block group-hover/ls:opacity-100 transition-all translate-x-[-10px] group-hover/ls:translate-x-0 opacity-0 text-foreground/50 rotate-0 group-hover/ls:-rotate-45'>
                              &rarr;
                            </span>
                          </small>
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
    </div>
  );
};
