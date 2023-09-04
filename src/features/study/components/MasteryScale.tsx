import { Button } from '@/components/ui/button';
import { useState } from 'react';

type MasteryScaleProps = {
  onSetMastery: (mastery: number) => void;
};
export default function MasteryScale({ onSetMastery }: MasteryScaleProps) {
  const [isDone, setIsDone] = useState(false);
  const handleSetMastery = (mastery: number) => {
    onSetMastery(mastery);
    setIsDone(true);
  };
  if (isDone) return <div>Thanks for your feedback!</div>;

  return (
    <div className='my-2'>
      <small className='mb-2 block'>How well did you remember?</small>
      <div className='flex items-center gap-1'>
        <Button
          title='Not well'
          variant={'outline'}
          onClick={() => handleSetMastery(0)}
          className='bg-destructive/20 hover:bg-destructive/30'
        >
          😓
        </Button>
        <Button
          title='Barely'
          variant={'outline'}
          onClick={() => handleSetMastery(5)}
          className='bg-orange-500/20 hover:bg-orange-500/30'
        >
          😕
        </Button>
        <Button
          title='Just About'
          variant={'outline'}
          onClick={() => handleSetMastery(10)}
          className='bg-yellow-500/20 hover:bg-yellow-500/30'
        >
          😐
        </Button>
        <Button
          title='Well'
          variant={'outline'}
          onClick={() => handleSetMastery(20)}
          className='bg-green-500/20 hover:bg-green-500/30'
        >
          🙂
        </Button>
        <Button
          title='I Know This'
          variant={'outline'}
          onClick={() => handleSetMastery(25)}
          className='bg-green-500/20 hover:bg-green-500/40'
        >
          😀
        </Button>
      </div>
    </div>
  );
}
