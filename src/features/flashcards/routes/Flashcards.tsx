import { NavLink, useLocation, useParams } from 'react-router-dom';
import { FlashcardType } from '../types';
import { Fragment, useEffect, useState } from 'react';
import { fetchFlashcardsByDeckId } from '../api/flashcards';
import { useNavigate } from 'react-router-dom';
import { addStudySession } from '../../study/api/studysessions';
import { getSessionId, setSessionId } from '../../../utils/setSessionId';
import { Button } from '@/components/ui/button';
import { PlayIcon } from '@heroicons/react/solid';
import { AddDeckFlashcardDialogForm, Flashcard } from '../components';
import { USER_ID } from '@/constants';
import { Progress } from '@/components/ui/progress';
import { DeckType } from '@/features/decks/types';
import { fetchDeckById } from '@/features/decks/api';
import { useToast } from '@/components/ui/use-toast';
import starImage from '@/assets/star.gif';
import { motion } from 'framer-motion';

function Flashcards() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { study: boolean };
  const { id } = useParams();
  const { toast } = useToast();
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);

  const [deck, setDeck] = useState<DeckType | null>(null);
  useEffect(() => {
    fetchFlashcardsByDeckId<FlashcardType>(Number(id), setFlashcards);
    fetchDeckById<DeckType>(Number(id), setDeck);
  }, [id]);

  useEffect(() => {
    if (state?.study) {
      toast({
        variant: 'success',
        children: <CompletedStudySession />,
      });
    }
  }, [state, toast]);

  const handleStartStudy = () => {
    addStudySession(
      {
        deck_id: Number(id),
        user_id: USER_ID,
        start_time: new Date(),
      },
      (sessionId) => {
        setSessionId(sessionId.toString());
        console.log(sessionId);
        console.log('session id set');
        console.log(getSessionId());
        navigate(`/decks/${id}/study`);
      }
    );
  };
  const overallMastery = flashcards.reduce((acc, curr) => {
    return acc + curr.mastery_level;
  }, 0);
  const averageMastery = overallMastery / flashcards.length || 0;

  return (
    <div className='relative'>
      <div className='flex items-center justify-between'>
        <NavLink to='/decks'>
          <Button variant='outline'>← Back</Button>
        </NavLink>
        <h2 className='text-lg font-bold'>Deck Overview</h2>
        <div className='flex items-center gap-2'>
          <p>Overall Mastery:</p>
          <div className='text-xs text-foreground/50 relative'>
            <div className='absolute inset-0 bg-gradient-to-r from-primary/50 to-secondary rounded-md blur opacity-50 z-[-1]'></div>
            {averageMastery.toFixed(2)}%
            <Progress value={averageMastery} />
          </div>
        </div>
      </div>
      <div className='flex items-center justify-between my-8'>
        <div>
          <h2 className='text-lg font-bold'>{deck?.name}</h2>
          <small className='text-foreground/50'>{deck?.description}</small>
        </div>
        <div className='flex items-center gap-2'>
          <AddDeckFlashcardDialogForm
            onMutation={setFlashcards}
            deckId={Number(id)}
          />
          <Button variant='success' onClick={handleStartStudy}>
            <PlayIcon className='h-5 w-5 mr-1' />
            Start Studying
          </Button>
        </div>
      </div>
      <motion.div
        className='flex flex-col gap-4'
        initial='hidden'
        animate='visible'
        variants={{
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05,
            },
          },
          hidden: { opacity: 0, y: 20, transition: { duration: 0.2 } },
        }}
      >
        {flashcards.map((flashcard) => (
          <Flashcard
            key={flashcard.id}
            flashcard={flashcard}
            setFlashcards={setFlashcards}
          />
        ))}
      </motion.div>
    </div>
  );
}
const CompletedStudySession = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <h2 className='text-xl font-bold animate-in'>Great work!</h2>
      <p className='text-center text-xs animate-in'>
        Spaced repetition is a proven technique for learning new things. Keep it
        up!
      </p>
      <img src={starImage} alt='star' className='w-32 h-32' />
    </div>
  );
};
export default Flashcards;
