import { Metric, Divider } from '@tremor/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { secondsToMinutes } from '@/lib/utils';
import { LucideClock } from 'lucide-react';
import { LastStudySession } from '../types';
import { Link } from 'react-router-dom';

export const StudyHistory = ({
  analyticsData,
}: {
  analyticsData: LastStudySession;
}) => {
  return (
    <Card className='border-none'>
      <CardHeader>
        <CardTitle className='flex items-center text-orange-400'>
          <LucideClock className='mr-1' /> <p>Study History</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <small className='text-foreground/50'>Last Study Session</small>
        <Metric>
          {new Date(analyticsData?.end_time).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          })}
        </Metric>
        <Divider />
        <small className='text-foreground/50'>Deck</small>
        <Link className='group' to={`/decks/${analyticsData?.id}/flashcards`}>
          <Metric className='group'>
            {analyticsData?.name}{' '}
            <span className='font-medium text-xl inline-block group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 opacity-0 text-foreground/50 rotate-0 group-hover:-rotate-45'>
              &rarr;
            </span>
          </Metric>
        </Link>
        <Divider />
        <small className='text-foreground/50'>Flashcards Studied</small>
        <Metric>{analyticsData?.flashcards_studied}</Metric>
        <Divider />
        <small className='text-foreground/50'>Time Spent Studying</small>
        <Metric>
          {secondsToMinutes(Number(analyticsData?.duration_sec))} minutes
        </Metric>
      </CardContent>
    </Card>
  );
};
