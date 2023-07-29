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
        <button className='' onClick={() => handleSetMastery(0)}>
          😓
        </button>
        <button className='' onClick={() => handleSetMastery(5)}>
          😕
        </button>
        <button className='' onClick={() => handleSetMastery(10)}>
          😐
        </button>
        <button className='' onClick={() => handleSetMastery(20)}>
          🙂
        </button>
        <button className='' onClick={() => handleSetMastery(25)}>
          😀
        </button>
      </div>
    </>
  );
}
