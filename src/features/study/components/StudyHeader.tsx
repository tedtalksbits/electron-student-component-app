import { Button } from '@/components/ui/button';
import { StopIcon } from '@heroicons/react/solid';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

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

    return {
      seconds: secondsStr,
      minutes: minutesStr,
    };
  };

  return (
    <header className='flex items-center justify-between max-w-7xl mx-auto p-4 w-full transition-all duration-500 ease-in-out bg-accent bg-opacity-40 rounded-md'>
      <div className='flex flex-col gap-1'>
        <StudyHeading />
        <div className='flex timer scale-up-center [animation-delay:.3s]'>
          <div className='relative '>
            <AnimatePresence>
              <motion.h2
                key={timerFormat(timeElapsed).minutes}
                className='text-2xl font-thin'
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 15, opacity: 0, position: 'absolute' }}
              >
                {timerFormat(timeElapsed).minutes}
              </motion.h2>
            </AnimatePresence>
          </div>
          <h2 className='text-2xl font-thin'>:</h2>
          <div className='relative'>
            <AnimatePresence>
              <motion.h2
                key={timerFormat(timeElapsed).seconds}
                className='text-2xl font-thin'
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 15, opacity: 0, position: 'absolute' }}
              >
                {timerFormat(timeElapsed).seconds}
              </motion.h2>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <Button variant='success' onClick={() => onDone(timeElapsed)}>
        <StopIcon className='w-4 h-4 mr-1' /> Done
      </Button>
    </header>
  );
};

export const StudyHeading = () => {
  return (
    <h1 className='font-bold text-3xl scale-down-left [animation-delay:.3s]'>
      Study
    </h1>
  );
};
