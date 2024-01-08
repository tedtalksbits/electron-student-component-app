import { FlashcardType } from '@/features/flashcards/types';
import { ReactNode, useState } from 'react';
import MasteryScale from './MasteryScale';
import Markdown from '@/components/markdown/Markdown';
import { CollapseContent, CollapseTrigger } from '@/components/ui/collapse';
import { UserLevel } from '@/features/user/types';
import { USER_ID } from '@/constants';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { NativeDialog } from '@/components/ui/native-dialog';
import { Loader, LockIcon, Unlock } from 'lucide-react';
interface StudyCardProps {
  flashcard: FlashcardType;
  handleRepeatCard: (flashcard: FlashcardType) => void;
  handleStudiedCard: (flashcardId: number) => void;
  index: number;
  userLevelData: UserLevel | null;
  onShowHint: () => void;
}
export const StudyCard = ({
  flashcard,
  handleRepeatCard,
  handleStudiedCard,
  index: i,
  userLevelData,
  onShowHint,
}: StudyCardProps) => {
  const handleShowHint = async (
    price: number,
    cb: (success: boolean) => void
  ) => {
    console.log(price);
    console.log(userLevelData?.total_xp);
    if (!userLevelData) return cb(false);
    if (userLevelData && userLevelData.total_xp < price) {
      console.log('not enough xp');
      return cb(false);
    }

    const { error } = await window.electron.ipcRenderer.user.updateUserXp(
      USER_ID,
      -price
    );

    if (error) {
      console.log(error);
      return cb(false);
    }

    cb(true);
    onShowHint();
    console.log('show hint');
  };
  return (
    <>
      <ClaimItem
        rewardItem={flashcard.hint}
        value={15000}
        label='Show hint'
        onUnlock={handleShowHint}
      />

      <div className='study-item-inner h-min w-[98%]'>
        <div
          onClick={() => {
            handleStudiedCard(flashcard.id);
          }}
          className='my-4 w-full'
        >
          <CollapseTrigger
            className='font-medium text-lg bg-transparent'
            aria-labelledby={flashcard.id.toString() + 'i-' + i}
            variant='ghost'
          >
            <Markdown>{flashcard.question}</Markdown>
          </CollapseTrigger>
          <CollapseContent
            className='w-full list-disc'
            id={flashcard.id.toString() + 'i-' + i}
          >
            <div className='answer border bg-card p-4 rounded-md text-card-foreground'>
              <Markdown className=''>{flashcard.answer}</Markdown>
            </div>
            <MasteryScale
              flashcard={flashcard}
              onForgotten={handleRepeatCard}
            />
          </CollapseContent>
        </div>
      </div>
    </>
  );
};
const variants = {
  loading: {
    scale: 0.95,
    transition: { duration: 0.2 },
  },
  loaded: {
    scale: 1,
    transition: { duration: 0.2 },
    // expand to a big box
  },
};

const ClaimItem = <T extends ReactNode>({
  rewardItem,
  onUnlock,
  label,
  value,
}: {
  rewardItem: T;
  onUnlock: (price: number, cb: (success: boolean) => void) => void;
  label: string;
  value: number;
}) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUnlock = async () => {
    if (loading) return;
    if (isUnlocked) return;
    setLoading(true);
    if (value < 0) throw new Error('value must be positive');
    onUnlock(value, (success) => {
      if (success) {
        // delay to show animation
        const promise = new Promise((resolve) => {
          setTimeout(() => {
            resolve('artificial delay');
          }, 300);
        });
        promise.then(() => {
          setIsUnlocked(true);
          setLoading(false);
          setShow(true);
        });
      } else {
        setError('Not enough XP');
        setLoading(false);
        setTimeout(() => {
          setError('');
        }, 3000);
      }
    });
  };
  return (
    <div className='relative my-4'>
      {!isUnlocked ? (
        <motion.button
          className='p-2 border rounded-md relative justify-between group animate-shine'
          onClick={handleUnlock}
          // whileHover={{ scale: 1.05 }}
          // whileTap={{ scale: 0.95 }}
          // transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          // variants={variants}
          // animate={loading ? 'loading' : 'loaded'}
        >
          {loading ? (
            <Loader className='animate-spin h-4 w-4' />
          ) : (
            <div className='flex items-center gap-1 px-4'>
              <div className='flex flex-col [&>*]:transition-transform [&>*]:ease-in-out [&>*]:duration-300 overflow-hidden relative'>
                <motion.div className='translate-y-[30px] group-hover:translate-y-[0px] delay-100'>
                  <Unlock className='h-4 w-4 absolute' />
                </motion.div>
                <div className='translate-y-[0px] group-hover:translate-y-[30px] delay-100'>
                  <LockIcon className='h-4 w-4' />
                </div>
              </div>

              <div className='flex flex-col [&>*]:transition-transform [&>*]:ease-in-out [&>*]:duration-300 overflow-hidden relative'>
                <p className='opacity-0 px-2 invisible'>
                  -{value.toLocaleString()} XP
                </p>
                <motion.div className='absolute ml-2 translate-y-[30px] group-hover:translate-y-[0px]'>
                  -{value.toLocaleString()} XP
                </motion.div>
                <div className='absolute ml-2 translate-y-[0px] group-hover:translate-y-[30px]'>
                  Unlock Hint
                </div>
              </div>
            </div>
          )}
        </motion.button>
      ) : (
        <motion.button
          className='p-2 border rounded-md'
          onClick={() => setShow(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          variants={variants}
          animate={loading ? 'loading' : 'loaded'}
        >
          {label}
        </motion.button>
      )}

      {error && <div className='text-destructive'>{error}</div>}
      <NativeDialog open={show} onClose={() => setShow(false)}>
        <div className='text-center flex items-center justify-center flex-col my-4'>
          <div className='py-3 bg-card rounded-md px-4 relative'>
            <Badge className='mb-2 bg-foreground/20'>Hint</Badge>
            {rewardItem}
          </div>
        </div>
      </NativeDialog>
    </div>
  );
};
