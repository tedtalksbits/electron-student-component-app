import { StudyDuration } from './StudyDuration';
import { MostStudied } from './MostStudied';
import { StudyHistory } from './StudyHistory';

export const AllStudyData = () => {
  return (
    <div>
      <h2 className='text-4xl font-bold'>Study Analytics</h2>
      <div className='grid grid-cols-3 gap-4 my-4'>
        <StudyDuration />
        <MostStudied />
        <StudyHistory />
      </div>
    </div>
  );
};
