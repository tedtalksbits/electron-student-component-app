import { useParams, useLocation } from 'react-router-dom';
import { FlashcardType } from '../types';
import { useEffect, useState } from 'react';
import { fetchFlashcardsByDeckId } from '../api/flashcards';
import { useNavigate } from 'react-router-dom';
import { addStudySession } from '../../study/api/studysessions';
import { getSessionId, setSessionId } from '../../../utils/setSessionId';
import { Button } from '@/components/ui/button';
import { PlayIcon } from '@heroicons/react/solid';
import { AddDeckFlashcardDialogForm, Flashcard } from '../components';
import { USER_ID } from '@/constants';
import { Progress } from '@/components/ui/progress';

function Flashcards() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);
  useEffect(() => {
    fetchFlashcardsByDeckId<FlashcardType>(Number(id), setFlashcards);
  }, [id]);

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
  const averageMastery = overallMastery / flashcards.length;

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-bold'>Deck Overview</h2>
        <div className='flex items-center gap-2'>
          <p>Overall Mastery:</p>
          <div className='text-foreground/50'>
            {averageMastery.toFixed(2)}%
            <Progress value={averageMastery} />
          </div>
        </div>
      </div>
      <div className='flex items-center justify-between my-4'>
        <h2 className='text-lg font-bold'>
          Flashcards | {query.get('deck_name') || id}
        </h2>
        <div className='flex items-center gap-2'>
          <AddDeckFlashcardDialogForm
            onMutation={setFlashcards}
            deckId={Number(id)}
          />
          <Button
            className='bg-green-600 hover:bg-opacity-70 hover:bg-green-600 border border-green-500 border-opacity-40 hover:border-opacity-80 bg-opacity-40 text-foreground '
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
