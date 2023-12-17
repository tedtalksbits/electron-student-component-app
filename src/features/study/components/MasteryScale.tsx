import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type MasteryScaleProps = {
  onSetMastery: (mastery: number) => void;
};
export default function MasteryScale({ onSetMastery }: MasteryScaleProps) {
  const [isDone, setIsDone] = useState(false);
  const handleSetMastery = (mastery: number) => {
    onSetMastery(mastery);
    setIsDone(true);
  };
  // if (isDone)
  //   return (
  //     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
  //       Thanks for your feedback!
  //     </motion.div>
  //   );

  return (
    <AnimatePresence>
      {/* <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} layout> */}
      {isDone ? (
        <motion.div
          layout
          key='feedback'
          className='mb-2 mt-[5rem] border rounded-md border-success/20 p-4 bg-success/20'
        >
          Thanks for your feedback!
        </motion.div>
      ) : (
        <div className='mb-2 mt-[5rem]' key='mastery-scale'>
          <div className='mb-4'>
            <p className='font-medium block'>How well did you recall?</p>
          </div>
          <div className='flex items-center gap-1'>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Button
                title='Not well'
                variant={'outline'}
                onClick={() => handleSetMastery(-40)}
                className='bg-destructive/20 hover:bg-destructive/30 border-destructive/20 hover:border-destructive/30'
              >
                <span className='text-lg'>😓</span>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Button
                title='Barely'
                variant={'outline'}
                onClick={() => handleSetMastery(5)}
                className='bg-orange-500/20 hover:bg-orange-500/30 border-orange-500/20 hover:border-orange-500/30'
              >
                <span className='text-lg'>😕</span>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Button
                title='Just About'
                variant={'outline'}
                onClick={() => handleSetMastery(10)}
                className='bg-yellow-500/20 hover:bg-yellow-500/30 border-yellow-500/20 hover:border-yellow-500/30'
              >
                <span className='text-lg'>😐</span>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Button
                title='Well'
                variant={'outline'}
                onClick={() => handleSetMastery(20)}
                className='bg-success/20 hover:bg-success/30 border-success/20 hover:border-success/30'
              >
                <span className='text-lg'>🙂</span>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Button
                title='I Know This'
                variant={'outline'}
                onClick={() => handleSetMastery(25)}
                className='bg-success/20 hover:bg-success/40 border-success/20 hover:border-success/40'
              >
                <span className='text-lg'>😀</span>
              </Button>
            </motion.div>
          </div>
        </div>
      )}
      {/* </motion.div> */}
    </AnimatePresence>
  );
}
