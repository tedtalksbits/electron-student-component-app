import { Metric, Divider } from '@tremor/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { secondsToMinutes } from '@/lib/utils';
import { LucideClock } from 'lucide-react';
import { LastStudySession } from '../types';

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
        <small className='text-foreground/50'>
          Last Study Session:{' '}
          <span className='text-foreground'>{analyticsData?.name}</span>
        </small>
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
