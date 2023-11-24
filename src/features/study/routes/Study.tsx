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
import { CodeSandboxLogoIcon } from '@radix-ui/react-icons';
import { useAppSelector } from '@/hooks/redux';
import { getLevelByXp } from '@/utils/gamification.engine';

export default function Study() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);
  const [, setIsDone] = useState(false);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [cardsStudied, setCardsStudied] = useState<number[]>([]);
  const flashcardContainerRef = useRef<HTMLDivElement>(null);

  const totalXp = useAppSelector((state) => state.studyAnalytics.totalXp);

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

        const prevLevel = getLevelByXp(totalXp.total_xp);

        // if > 1 card studied, go to /decks/:id/flashcards?study=true
        if (data.flashcards_studied >= 1) {
          console.log('more than 1 card studied');
          navigate(`/analytics`, {
            state: {
              study: true,
              prevXp: totalXp,
              prevLevel: prevLevel?.level,
            },
          });
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
    <>
      <div
        className='
        bg-gradient-to-b
        from-destructive/20
        to-transparent
        w-full
        h-[200px]
        left-0
        top-0
        absolute
        z-[-1] animate-fade-in'
      ></div>
      <div className='overflow-hidden max-w-7xl mx-auto' id='study-session'>
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
        <a
          className=''
          target='_blank'
          href='https://leetcode.com/playground/new/empty'
          title='Leetcode Playground'
        >
          <Button>
            <CodeSandboxLogoIcon className='mr-1' /> Playground
          </Button>
        </a>
      </div>
    </>
  );
}
