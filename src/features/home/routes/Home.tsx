import { AppsGrid } from '@/components/navigation/AppsGrid';
import { Title } from '@tremor/react';

import { Calendar } from '@/components/ui/calendar';
import { useEffect, useState } from 'react';
import { USER_ID } from '@/constants';
import { User } from '@/features/user/types';
import { DeckType } from '@/features/decks/types';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const [lastStudiedDeck, setLastStudiedDeck] = useState<null | DeckType>(null);
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

    window.electron.ipcRenderer.deck
      .getLastStudiedDeck(USER_ID)
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
          return;
        }
        if (data) {
          setLastStudiedDeck(data);
        }
      });
  }, []);

  return (
    <div className='flex animate-fade-in'>
      <div className='mt-20 max-w-xl mx-auto h-fit'>
        <div className='border rounded-xl shadow-md p-4'>
          <h3 className='font-medium text-3xl mb-8'>Hello, {user?.name}</h3>
          <AppsGrid size='lg' />
        </div>
        {lastStudiedDeck && (
          <div className='mt-8'>
            <Title>Jump Back In</Title>
            <Link
              className='group text-primary'
              to={`/decks/${lastStudiedDeck.id}/flashcards`}
            >
              <p className='group'>
                {lastStudiedDeck.name}{' '}
                <span className='font-medium text-xl inline-block group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 opacity-0 text-foreground/50 rotate-0 group-hover:-rotate-45'>
                  &rarr;
                </span>
              </p>
            </Link>
          </div>
        )}
      </div>
      <div className='border-l h-[calc(100vh-5rem)] p-4'>
        <Title className='mb-4'>Calendar</Title>
        <Calendar className='w-full rounded border' />
      </div>
    </div>
  );
};
