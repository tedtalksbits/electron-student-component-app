import { useParams, useNavigate } from 'react-router-dom';
import { FlashcardType } from '../../flashcards/types';
import { useEffect, useState, useRef } from 'react';
import { fetchFlashcardsByDeckId } from '../../flashcards/api/flashcards';
import { useCallback } from 'react';
import { updateStudySession } from '../api/studysessions';
import { getSessionId } from '../../../utils/setSessionId';
import { StudyFlashcard, StudyHeader, StudyHeading } from '../components';
import { StudyFlashcardNavItems } from '../components/StudyFlashcardNavItems';
import { Button } from '@/components/ui/button';
import { USER_ID } from '@/constants';

export default function Study() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [cardsStudied, setCardsStudied] = useState<number[]>([]);
  const flashcardContainerRef = useRef<HTMLDivElement>(null);

  const timerFormat = (timeElapsed: number) => {
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;

    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(seconds).padStart(2, '0');

    return `${minutesStr}:${secondsStr}`;
  };

  const getFlashcardsByDeckId = useCallback(() => {
    fetchFlashcardsByDeckId(Number(id), setFlashcards);
  }, [id]);

  useEffect(() => {
    getFlashcardsByDeckId();
  }, [getFlashcardsByDeckId]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isDone) {
      timer = setInterval(() => {
        setTimeElapsed((timeElapsed) => timeElapsed + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isDone]);

  const navClickHandler = (index: number) => {
    setCurrentFlashcardIndex(index);
  };

  useEffect(() => {
    if (!flashcardContainerRef.current) return;

    flashcardContainerRef.current.style.transform = `translateX(-${
      currentFlashcardIndex * 100
    }%)`;
    flashcardContainerRef.current.style.opacity = '1';
  }, [currentFlashcardIndex]);

  const handleDone = () => {
    const sessionId = Number(getSessionId());
    if (!sessionId) return;
    updateStudySession(
      {
        deck_id: Number(id),
        user_id: USER_ID,
        end_time: new Date(),
        duration_sec: timeElapsed,
        flashcards_studied: cardsStudied.length,
      },
      sessionId,
      (data) => {
        console.log('study session updated');
        console.log(data);
        navigate(-1);
      }
    );
    setIsDone(true);
    setTimeElapsed(0);
  };

  const handleStudiedCard = (id: number) => {
    if (cardsStudied.includes(id)) return;
    setCardsStudied([...cardsStudied, id]);
  };

  if (!flashcards.length) return <div>Loading...</div>;

  return (
    <div className='overflow-hidden' id='study-session'>
      <StudyHeader>
        <div className='flex flex-col gap-1'>
          <StudyHeading />
          <h2>Time Elapsed: {timerFormat(timeElapsed)}</h2>
        </div>
        <Button
          className='bg-green-500/80 ring-green-500 hover:bg-green-500'
          onClick={handleDone}
        >
          Done
        </Button>
      </StudyHeader>
      <div className='study-container' ref={flashcardContainerRef}>
        {flashcards.map((flashcard) => (
          <div key={flashcard.id} className='study-item'>
            <div className='study-item-inner'>
              <StudyFlashcard
                flashcard={flashcard}
                handleStudiedCard={handleStudiedCard}
                setFlashcards={setFlashcards}
              />
              <div className='w-full flex items-center justify-between'>
                <Button
                  variant='outline'
                  className='disabled:opacity-50 disabled:cursor-not-allowed'
                  onClick={() =>
                    setCurrentFlashcardIndex(currentFlashcardIndex - 1)
                  }
                  disabled={currentFlashcardIndex === 0}
                >
                  Previous
                </Button>
                <StudyFlashcardNavItems
                  flashcards={flashcards}
                  navItemClickHandler={navClickHandler}
                  currentFlashcardIndex={currentFlashcardIndex}
                />
                <Button
                  onClick={() =>
                    setCurrentFlashcardIndex(currentFlashcardIndex + 1)
                  }
                  disabled={currentFlashcardIndex === flashcards.length - 1}
                  className='disabled:opacity-50 disabled:cursor-not-allowed'
                  variant='outline'
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
