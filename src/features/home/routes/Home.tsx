import { AppsGrid } from '@/components/navigation/AppsGrid';
import { Title } from '@tremor/react';

export const Home = () => {
  return (
    <div className='mt-20 p-4 border rounded-xl shadow-md max-w-xl mx-auto bg-accent'>
      <Title className='mb-4'>Apps</Title>
      <AppsGrid size='lg' />
    </div>
  );
};
