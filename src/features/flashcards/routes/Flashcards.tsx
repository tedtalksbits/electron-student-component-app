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
import { Transition } from '@headlessui/react';
import starImage from '@/assets/star.gif';

function Flashcards() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { study: boolean };
  const { id } = useParams();

  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);
  const [showStudyAnimation, setShowStudyAnimation] = useState(false);
  const [deck, setDeck] = useState<DeckType | null>(null);
  useEffect(() => {
    fetchFlashcardsByDeckId<FlashcardType>(Number(id), setFlashcards);
    fetchDeckById<DeckType>(Number(id), setDeck);
  }, [id]);

  useEffect(() => {
    if (state?.study) {
      setShowStudyAnimation(true);
      setTimeout(() => {
        setShowStudyAnimation(false);
      }, 3000);
    }
  }, [state]);

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
      <Transition
        as={Fragment}
        show={showStudyAnimation}
        enter='transform transition duration-[900ms]'
        enterFrom='opacity-0 scale-50 translate-y-[-100%]'
        enterTo='opacity-100 scale-125'
        leave='transform duration-600 transition ease-in-out'
        leaveFrom='opacity-100 scale-125 '
        leaveTo='opacity-0 scale-95 translate-y-[-100%]'
      >
        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center z-10 select-none'>
          <div className='bg-accent p-8 rounded-md text-center'>
            <p className='font-black'>Nice work!</p>
            <img src={starImage} alt='star' className='w-36 h-36' />
          </div>
        </div>
      </Transition>
      <div className='flex items-center justify-between'>
        <NavLink to='/decks'>
          <Button variant='outline'>← Back</Button>
        </NavLink>
        <h2 className='text-lg font-bold'>Deck Overview</h2>
        <div className='flex items-center gap-2'>
          <p>Overall Mastery:</p>
          <div className='text-foreground/50'>
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
          <Button
            className='bg-success/80 hover:bg-opacity-70 hover:bg-success border border-success border-opacity-40 hover:border-opacity-80 bg-opacity-40 text-foreground '
            onClick={handleStartStudy}
          >
            <PlayIcon className='h-5 w-5 mr-1' />
            Start Studying
          </Button>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        {flashcards.map((flashcard) => (
          <Flashcard
            key={flashcard.id}
            flashcard={flashcard}
            setFlashcards={setFlashcards}
          />
        ))}
      </div>
    </div>
  );
}

export default Flashcards;
