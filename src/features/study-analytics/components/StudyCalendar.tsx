import React from 'react';
import { DailyStudyAnalytics } from '../types';
import dayjs, { Dayjs } from 'dayjs';
import { Calendar } from 'antd';
import { Badge } from '@/components/ui/badge';

export const StudyCalendar = ({ data }: { data: DailyStudyAnalytics[] }) => {
  const renderValue = (value: Dayjs) => {
    const listData = data
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
        {listData.map((studyData, i) => (
          <span
            key={studyData.study_date.toString() + i}
            title={`1 session\n${studyData.total_flashcards_studied.toString()} flashcards studied`}
          >
            <TrendMeter value={studyData.total_flashcards_studied} />
          </span>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <Calendar
        className='bg-transparent rounded-sm'
        style={{ border: 'none', backgroundColor: 'transparent' }}
        onChange={(value) => console.log(value)}
        cellRender={renderValue}
      />
      {/* <Calendar
        modifiers={modifiers}
        // modifiersStyles={{
        //   studied: {
        //     backgroundColor: '#10B981',
        //     color: '#fff',
        //     borderRadius: '50%',
        //     padding: '0.25rem',
        //   },
        // }}
        modifiersStyles={modifiersStyles}
      /> */}
    </div>
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
  const cold = value === 0;

  if (redHot) {
    return <Badge className='w-2 h-5 rounded-sm bg-success'></Badge>;
  } else if (hot) {
    return <Badge className='w-2 h-5 rounded-sm bg-success/80'></Badge>;
  } else if (warm) {
    return <Badge className='w-2 h-5 rounded-sm bg-success/60'></Badge>;
  } else if (cool) {
    return <Badge className='w-2 h-5 rounded-sm bg-success/40'></Badge>;
  } else if (cold) {
    return <Badge className='w-2 h-5 rounded-sm bg-success/20'></Badge>;
  } else return <Badge className='w-2 h-5 rounded-sm bg-secondary'></Badge>;
};
