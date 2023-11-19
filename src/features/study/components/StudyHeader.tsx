import { Button } from '@/components/ui/button';
import React from 'react';

export const StudyHeader = ({
  onDone,
}: {
  onDone: (timeElapse: number) => void;
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
    <header className='flex items-center justify-between max-w-7xl mx-auto p-4 w-full transition-all duration-500 ease-in-out bg-accent bg-opacity-40 rounded-md'>
      <div className='flex flex-col gap-1'>
        <StudyHeading />
        <h2>Time Elapsed: {timerFormat(timeElapsed)}</h2>
      </div>
      <Button
        className='bg-success/80 ring-success hover:bg-success'
        onClick={() => onDone(timeElapsed)}
      >
        Done
      </Button>
    </header>
  );
};

export const StudyHeading = () => {
  return <h1 className='font-bold text-3xl'>Study</h1>;
};
