import React, { useEffect } from 'react';
import { getStudyAnalytics } from '../api';
import { StudySession } from '@/features/study/types';
import { StudyDuration } from './StudyDuration';
import { MostStudied } from './MostStudied';
import { StudyHistory } from './StudyHistory';

export const AllStudyData = () => {
  const [studyData, setStudyData] = React.useState<StudySession[]>([]);

  useEffect(() => {
    getStudyAnalytics(2, setStudyData);
  }, []);
  return (
    <div>
      <h2 className='text-4xl font-bold'>Study Analytics</h2>
      <div className='grid grid-cols-3 gap-4 my-4'>
        <StudyDuration studySessions={studyData} />
        <MostStudied studySessions={studyData} />
        <StudyHistory studySessions={studyData} />
      </div>
    </div>
  );
};
