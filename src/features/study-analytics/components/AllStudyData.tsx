import React, { useEffect } from 'react';
import { getStudyAnalytics } from '../api';
import { StudySession } from '@/features/study/types';
import { StudyDuration } from './StudyDuration';
import { MostStudied } from './MostStudied';
import { StudyHistory } from './StudyHistory';
import { USER_ID } from '@/constants';

export const AllStudyData = () => {
  const [studyData, setStudyData] = React.useState<StudySession[]>([]);

  useEffect(() => {
    getStudyAnalytics(USER_ID, setStudyData);
  }, []);
  return (
    <div>
      <h2 className='text-4xl font-bold'>Study Analytics</h2>
      <div className='grid grid-cols-3 gap-4 my-4'>
        <StudyDuration studySessions={studyData} />
        <MostStudied />
        <StudyHistory studySessions={studyData} />
      </div>
    </div>
  );
};
