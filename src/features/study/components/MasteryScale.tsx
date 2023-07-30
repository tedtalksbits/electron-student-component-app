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
    <>
      <small>How well did you remember?</small>
      <div className='flex items-center gap-1'>
        <Button variant={'outline'} onClick={() => handleSetMastery(0)}>
          😓
        </Button>
        <Button variant={'outline'} onClick={() => handleSetMastery(5)}>
          😕
        </Button>
        <Button variant={'outline'} onClick={() => handleSetMastery(10)}>
          😐
        </Button>
        <Button variant={'outline'} onClick={() => handleSetMastery(20)}>
          🙂
        </Button>
        <Button variant={'outline'} onClick={() => handleSetMastery(25)}>
          😀
        </Button>
      </div>
    </>
  );
}
