import { AppsGrid } from '@/components/navigation/AppsGrid';
import { Title } from '@tremor/react';

import { Calendar } from '@/components/ui/calendar';
import { indexRoutes } from '@/routes';

export const Home = () => {
  return (
    <div className='flex'>
      <div className='mt-20 p-4 border rounded-xl shadow-md max-w-xl mx-auto bg-accent h-fit'>
        <Title className='mb-4'>Apps</Title>
        <AppsGrid size='lg' routes={indexRoutes} />
      </div>
      <div className='border-l h-[calc(100vh-5rem)] p-4'>
        <Title className='mb-4'>Calendar</Title>
        <Calendar className='w-full rounded border' />
      </div>
    </div>
  );
};
