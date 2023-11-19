import { StudyDuration } from './StudyDuration';
import { MostStudied } from './MostStudied';
import { StudyHistory } from './StudyHistory';

export const AllStudyData = () => {
  return (
    <div>
      <div className='flex items-center justify-between my-8'>
        <h3 className='text-2xl font-bold'>Study Analytics</h3>
      </div>

      <div className='grid grid-cols-3 gap-4 my-4'>
        <StudyDuration />
        <MostStudied />
        <StudyHistory />
      </div>
    </div>
  );
};
