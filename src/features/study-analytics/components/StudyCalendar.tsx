import { DailyStudyAnalytics } from '../types';
import dayjs, { Dayjs } from 'dayjs';
import { Calendar } from 'antd';
import { LucideFlame, LucideX } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const StudyCalendar = ({
  analyticsData,
}: {
  analyticsData: DailyStudyAnalytics[];
}) => {
  const renderValue = (value: Dayjs) => {
    const listData = analyticsData
      .filter((sd) => {
        const sdDate = dayjs(sd.study_date).format('MM/DD/YYYY');
        const date = value.format('MM/DD/YYYY');

        return date === sdDate;
      })
      .sort((a, b) => {
        return a.study_date.localeCompare(b.study_date);
      });

    return (
      <ul className=''>
        {listData.map((studyData, i) =>
          studyData ? (
            <span
              key={studyData.study_date.toString() + i}
              title={`1 session\n${studyData.total_flashcards_studied.toString()} flashcards studied`}
            >
              <TrendMeter value={studyData.total_flashcards_studied} />
            </span>
          ) : (
            <span key={i} title={`No sessions\n0 flashcards studied`}>
              <TrendMeter value={0} />
            </span>
          )
        )}
      </ul>
    );
  };

  return (
    <Card className='border-none'>
      <CardHeader>
        <CardTitle className='flex items-center text-orange-400 '>
          <LucideFlame className='mr-1' /> <p>Study Sessions</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          className='bg-transparent rounded-sm'
          style={{ border: 'none', backgroundColor: 'transparent' }}
          onChange={(value) => console.log(value)}
          cellRender={renderValue}
        />
      </CardContent>
    </Card>
  );
};

const TrendMeter = ({ value }: { value: number }) => {
  // redhot = 100% or more
  const redHot = value >= 20;
  // hot = 80% or more
  const hot = value >= 15;
  // warm = 50% or more
  const warm = value >= 10;
  // cool = 20% or more
  const cool = value > 0;
  // cold = 0% or more
  const cold = value === 0 || value === null;

  if (redHot) {
    return (
      <div className='w-5 h-5 2xl:w-10 2xl:h-10 rounded-full bg-gradient-to-t from-red-400 to-orange-400 flex items-center justify-center'>
        <span>
          <LucideFlame className='w-4 h-4 2xl:h-8 2xl:w-8' />
        </span>
      </div>
    );
  } else if (hot) {
    return (
      <div className='w-5 h-5 2xl:w-10 2xl:h-10 rounded-full bg-gradient-to-t  from-red-400 to-orange-400'></div>
    );
  } else if (warm) {
    return (
      <div className='w-5 h-5 2xl:w-10 2xl:h-10 rounded-full bg-gradient-to-t  from-red-400 to-orange-400'></div>
    );
  } else if (cool) {
    return (
      <div className='w-5 h-5 2xl:w-10 2xl:h-10 rounded-full bg-gradient-to-t  from-red-400 to-orange-400'></div>
    );
  } else if (cold) {
    return (
      <div className='w-5 h-5 2xl:w-10 2xl:h-10 rounded-full bg-gradient-to-t from-green-400 to-blue-400'></div>
    );
  } else
    return (
      <div className='w-5 h-5 2xl:w-10 2xl:h-10 rounded-full bg-secondary flex items-center justify-center'>
        <span>
          <LucideX className='w-4 h-4 2xl:h-8 2xl:w-8' />
        </span>
      </div>
    );
};
