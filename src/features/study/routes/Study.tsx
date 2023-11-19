import { useParams, useNavigate } from 'react-router-dom';
import { FlashcardType } from '../../flashcards/types';
import { useEffect, useState, useRef } from 'react';
import { fetchFlashcardsByDeckId } from '../../flashcards/api/flashcards';
import { useCallback } from 'react';
import { updateStudySession } from '../api/studysessions';
import { getSessionId } from '../../../utils/setSessionId';
import { StudyFlashcard, StudyHeader } from '../components';
import { StudyFlashcardNavItems } from '../components/StudyFlashcardNavItems';
import { Button } from '@/components/ui/button';
import { USER_ID } from '@/constants';

export default function Study() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);
  const [, setIsDone] = useState(false);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [cardsStudied, setCardsStudied] = useState<number[]>([]);
  const flashcardContainerRef = useRef<HTMLDivElement>(null);

  const getFlashcardsByDeckId = useCallback(() => {
    fetchFlashcardsByDeckId(Number(id), setFlashcards);
  }, [id]);

  useEffect(() => {
    getFlashcardsByDeckId();
  }, [getFlashcardsByDeckId]);

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

  const handleDone = (timeElapsed: number) => {
    console.log('done', timeElapsed);
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

        // if > 1 card studied, go to /decks/:id/flashcards?study=true
        if (data.flashcards_studied >= 1) {
          console.log('more than 1 card studied');
          navigate(`/decks/${id}/flashcards`, { state: { study: true } });
        } else {
          console.log('less than 1 card studied');
          navigate(`/decks/${id}/flashcards`);
        }
      }
    );
    setIsDone(true);
  };

  const handleStudiedCard = (id: number) => {
    if (cardsStudied.includes(id)) return;
    setCardsStudied([...cardsStudied, id]);
  };

  if (!flashcards.length) return <div>Loading...</div>;

  return (
    <div className='overflow-hidden' id='study-session'>
      <StudyHeader onDone={handleDone} />

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
                  &larr; Previous
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
                  Next &rarr;
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* embedd leetcodes playground */}
      {/* 
      <a
        className='text-primary hover:underline'
        target='_blank'
        href='https://leetcode.com/playground/new/empty'
        title='Leetcode Playground'
      >
        Playground
      </a> */}
    </div>
  );
}
