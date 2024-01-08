import { Button } from '@/components/ui/button';
import { StopIcon } from '@heroicons/react/solid';
import React from 'react';
import { DeckType } from '@/features/decks/types';

export const StudyHeader = ({
  onDone,
  deck,
}: {
  onDone: (timeElapse: number) => void;
  deck: DeckType;
}) => {
  const [timeElapsed, setTimeElapsed] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((timeElapsed) => timeElapsed + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  const timerFormat = (timeElapsed: number) => {
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;

    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(seconds).padStart(2, '0');

    return `${minutesStr}:${secondsStr}`;
  };

  return (
    <header className=' w-[98%] mx-auto flex gap-3 items-center justify-between p-4 transition-all duration-500 ease-in-out bg-background/50 backdrop-blur-md border rounded-md hover:bg-card group'>
      <div className='w-[98%] mx-auto deck-info animate-fade-in my-8'>
        <h1 className='text-2xl font-semibold text-foreground/50 group-hover:text-foreground transition-all duration-500 ease-in-out'>
          {deck.name}
        </h1>
        <p className='text-foreground/50'>{deck.description}</p>
      </div>

      <div className='flex timer scale-up-center [animation-delay:.3s] border py-2 px-3 rounded-md  '>
        <h3 className=''>
          <span className='flex text-2xl font-medium'>
            <span className='mr-2'>Time: </span>
            <div className='w-[5ch]'>{timerFormat(timeElapsed)}</div>
          </span>
        </h3>
      </div>

      <Button variant='success' onClick={() => onDone(timeElapsed)}>
        <StopIcon className='w-4 h-4 mr-1' /> Done
      </Button>
    </header>
  );
};
