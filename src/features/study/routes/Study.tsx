import { useParams, useNavigate } from 'react-router-dom';
import { FlashcardType } from '../../flashcards/types';
import { useEffect, useState, useRef } from 'react';
import { updateStudySession } from '../api/studysessions';
import { getSessionId } from '../../../utils/setSessionId';
import { StudyHeader } from '../components';
import { StudyCardsPagination } from '../components/StudyCardsPagination';
import { Button } from '@/components/ui/button';
import { USER_ID } from '@/constants';
import { CodeSandboxLogoIcon } from '@radix-ui/react-icons';
import GoBackButton from '@/components/navigation/GoBackButton';
import { flashcardApi } from '../../flashcards/api';
import { deckApi } from '@/features/decks/api';
import { DeckType } from '@/features/decks/types';
import { StudyCard } from '../components/StudyCard';
import { UserLevel } from '@/features/user/types';
import { XpBar } from '@/features/gamification/components/XpBar';
export interface StudyUrlState {
  study: boolean;
  prevXp: number;
  prevLevel: number;
}
export default function Study() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);
  const [deck, setDeck] = useState<DeckType>({} as DeckType);
  const [, setIsDone] = useState(false);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [cardsStudied, setCardsStudied] = useState<number[]>([]);
  const flashcardContainerRef = useRef<HTMLDivElement>(null);

  const [userLevelData, setUserLevelData] = useState<UserLevel | null>(null);
  useEffect(() => {
    (async () => {
      await getUserLevelData();
    })();
    console.log('user level data');
  }, []);

  const getUserLevelData = async () => {
    window.electron.ipcRenderer.user
      .getUserLevelAndXp(USER_ID)
      .then(({ data, error }) => {
        if (data) {
          setUserLevelData(data);
        }
        if (error) {
          console.log(error);
        }
      });
  };
  useEffect(() => {
    flashcardApi.getRandomFlashcards(Number(id)).then(({ data, error }) => {
      if (error) {
        console.log(error);
        return;
      }
      if (data) {
        setFlashcards(data);
      }
    });

    deckApi.getDeckById(Number(id)).then(({ data, error }) => {
      if (error) {
        console.log(error);
        return;
      }
      if (data) {
        setDeck(data);
      }
    });
  }, [id]);

  useEffect(() => {
    if (!flashcardContainerRef.current) return;

    flashcardContainerRef.current.style.transform = `translateX(-${
      currentFlashcardIndex * 100
    }%)`;
    flashcardContainerRef.current.style.opacity = '1';
  }, [currentFlashcardIndex]);

  const handleDone = async (timeElapsed: number) => {
    console.log('done', timeElapsed);
    const sessionId = Number(getSessionId());
    if (!sessionId) return;
    // const { data: userLevelData, error } =
    //   await window.electron.ipcRenderer.user.getUserLevelAndXp(USER_ID);
    // if (error) {
    //   console.log(error);
    // }
    if (cardsStudied.length === 0) return navigate(`/decks/${id}/flashcards`);
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

        // if > 1 card studied, go to analytics
        if (data.flashcards_studied >= 1) {
          console.log('more than 1 card studied');
          navigate(`/analytics`, {
            state: {
              study: true,
              prevXp: userLevelData?.total_xp || 0,
              prevLevel: userLevelData?.level || 0,
            } as StudyUrlState,
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

  const handleRepeatCard = (flashcard: FlashcardType) => {
    setFlashcards((prev) => [...prev, flashcard]);
  };

  if (!flashcards.length)
    return (
      <div>
        There are no flashcards in deck: {id} <GoBackButton />
      </div>
    );

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
      <div
        className='animate-fade-in overflow-hidden max-w-7xl mx-auto'
        id='study-session'
      >
        <div className='pl-[2%] py-2'>
          <XpBar userLevelAndXp={userLevelData} />
        </div>
        <StudyHeader onDone={handleDone} deck={deck} />

        <div className='study-container' ref={flashcardContainerRef}>
          {flashcards.map((flashcard, i) => (
            <div key={flashcard.id + 'i-' + i} className='study-item'>
              <StudyCard
                onShowHint={getUserLevelData}
                userLevelData={userLevelData}
                flashcard={flashcard}
                index={i}
                handleRepeatCard={handleRepeatCard}
                handleStudiedCard={handleStudiedCard}
                key={flashcard.id + 'i-' + i}
              />
              <div className='w-full flex items-center justify-between'>
                <StudyCardsPagination
                  flashcards={flashcards}
                  currentIndex={currentFlashcardIndex}
                  setCurrentIndex={setCurrentFlashcardIndex}
                />
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
