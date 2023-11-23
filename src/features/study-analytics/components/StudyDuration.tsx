import { Metric, Divider } from '@tremor/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { secondsToMinutes } from '@/lib/utils';
import { LucideTimer } from 'lucide-react';
import { TotalStudyAnalytics } from '../types';

export const StudyDuration = ({
  analyticsData,
}: {
  analyticsData: TotalStudyAnalytics;
}) => {
  return (
    <Card className='border-none h-fit'>
      <CardHeader>
        <CardTitle className='flex items-center text-orange-400'>
          <LucideTimer className='mr-1' /> <p>Study Duration</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <small className='text-foreground/50'>Total Study Time</small>
        <Metric>
          {Math.floor(analyticsData.total_time_studied / 60)} minutes
        </Metric>
        <Divider />
        <small className='text-foreground/50'>Total Flashcards Studied</small>
        <Metric>{analyticsData.total_flashcards_studied}</Metric>
        <Divider />
        <small className='text-foreground/50'>Total Study Sessions</small>
        <Metric>{analyticsData.total_completed_sessions}</Metric>
        <Divider />
        <small className='text-foreground/50'>Average Study Duration</small>
        <Metric>
          {secondsToMinutes(analyticsData.average_study_duration)} minutes
        </Metric>
      </CardContent>
    </Card>
  );
};
