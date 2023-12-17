import { AppsGrid } from '@/components/navigation/AppsGrid';
import { Title } from '@tremor/react';

import { Calendar } from '@/components/ui/calendar';
import { useEffect, useState } from 'react';
import { USER_ID } from '@/constants';
import { User } from '@/features/user/types';

export const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    window.electron.ipcRenderer.user
      .getUserById(USER_ID)
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
          return;
        }
        if (data) {
          setUser(data);
        }
      });
  }, []);
  return (
    <div className='flex'>
      <div className='mt-20 p-4 border rounded-xl shadow-md max-w-xl mx-auto h-fit'>
        <h3 className='font-medium text-3xl mb-8'>Hello, {user?.name}</h3>

        <AppsGrid size='lg' />
      </div>
      <div className='border-l h-[calc(100vh-5rem)] p-4'>
        <Title className='mb-4'>Calendar</Title>
        <Calendar className='w-full rounded border' />
      </div>
    </div>
  );
};
